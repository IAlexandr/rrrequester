import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  r_date: String,
  r_code: String,
  r_status: String,
});

const RequestSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  responseDate: {
    type: Date,
  },
  status: {
    type: String,
  },
  cadNum: {
    type: String,
  },
  r_id: {
    type: String,
  },
  r_code: {
    type: String,
  },
  events: [eventSchema],
});

export default model('Requests', RequestSchema);
