import options from './../options';
import Requester from './requester';
import db from './db';

export default {
  init() {
    const { rrrNodeAddress } = options;
    this.requester = new Requester({ rrrNodeAddress });
    this.test();
  },
  test() {
    db.requests
      .find({})
      .exec((err) => {
        if (err) {
          throw err;
        }
      });
  },
};
