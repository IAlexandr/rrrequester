import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  r_date: String,
  r_code: String,
  r_status: String,
});

const RequestSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: false,
    enum: ['KPT_free', 'CadastralPassport_free', 'KV_free', 'KS_ZU_KS_free'],
  },
  events: [eventSchema],
});

export default mongoose.model('requests2', RequestSchema);
