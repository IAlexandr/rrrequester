import mongoose from 'mongoose';
import options from './../../options';
import dbmodels from './dbmodels';

mongoose.connect(options.mongoDbUrl);

export default {
  getCollectionDocs: (collectionName, callback) => {
    dbmodels[collectionName]
      .find({})
      .exec((err, docs) => {
        callback(err, docs);
      });
  },

  addDocToCollection: (collectionName, doc, callback) => {
    const item = new dbmodels[collectionName](doc);

    item.save(callback);
  },

  mongoose,
};
