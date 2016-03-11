import mongoose from 'mongoose';
import options from './../../options';
import dbmodels from './dbmodels';

mongoose.connect(options.mongoDbUrl);

let db = {
  mongoose,
};

db = { ...db, ...dbmodels };

export default db;
