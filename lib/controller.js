import options from './../options';
import Requester from './requester';
import db from './db';
import async from 'async';
import superagent from 'superagent';
import l from './logger';

const E_ID = '56c724dba43c9c7c9f9bca1d';
const KEY = '56d8229497f3e69f2dd16c93';
const Request2 = db.requests2;
let responsesCount = 0;
let featureRequestsCount = 0;

function infoMsg(msg, c, n, obj) {
  if (c % n === 0 || c === 1) {
    l.log(msg + c, obj);
  }
}

export default {
  init() {
    const { rrrNodeAddress } = options;
    l.log(rrrNodeAddress);
    this.rrrNodeAddress = rrrNodeAddress;
    this.requester = new Requester({ rrrNodeAddress });
    this.test();
  },
  test() {
    const _this = this;
    async.waterfall([
      (callback) => {
        db.requests
          .find({})// { type: 'KPT_free' }) // TODO uniq by createdAt $gte
          .exec(callback);
      }, (kptRequests, callback) => {
        l.log('kptRequests.length:', kptRequests.length);
        const responses = [];
        async.eachLimit(kptRequests, 20, (request, done) => {
          db.responses
            .findOne({ requestId: request._id })
            .exec((err, response) => {
              if (err) {
                return done(err);
              }
              responses.push(response);
              return done();
            });
        }, (err) => {
          if (err) {
            return callback(err);
          }
          return callback(err, responses);
        });
      }, (kptResponses, callback) => {
        l.log('kptResponses.length:', kptResponses.length);
        l.log('start!');
        async.eachLimit(kptResponses, 1, (response, done) => {
          const { features } = response;
          if (features.length > 0) {
            async.eachLimit(features, 50, (feature, cb) => {
              // TODO post
              const CN = feature.properties.CadastralNumber;
              if (!CN) {
                l.log('!!!!Empty CN:', CN);
              }
              const data = {
                e_id: E_ID,
                type: 'CadastralPassport_free',
                cnumber: CN,
                zem: 2,
              };
              superagent
                .post(`${_this.rrrNodeAddress}/requests`)
                .query({ key: KEY })
                .set('Accept', 'application/json')
                .send(data)
                .end((err, rr) => {
                  if (err) {
                    return cb(err);
                  }
                  const rrrequest = JSON.parse(rr.text);
                  featureRequestsCount++;
                  infoMsg('featureRequestsCount:', featureRequestsCount, 1000, rrrequest);
                  _this.saveRequest(rrrequest, CN, cb);
                });
            }, err => {
              if (err) {
                return done(err);
              }
              responsesCount++;
              infoMsg('responsesCount:', responsesCount, 10);
              return done();
            });
          } else {
            responsesCount++;
            infoMsg('responsesCount:', responsesCount, 10);
            return done();
          }
        }, callback);
      },
    ], (err) => {
      if (err) {
        throw err;
      }
      l.log('test done.');
    });
  },
  saveRequest(rr, CN, cb) {
    const request = new Request2();
    request.r_id = rr.r_id;
    request.status = rr.r_end;
    request.r_code = rr.r_code;
    request.cadNum = CN;
    request.events = rr.events;
    request.type = 'CadastralPassport_free';
    request.save(saveErr => {
      if (saveErr) {
        return cb(saveErr);
      }
      return cb();
    });
  },
};
