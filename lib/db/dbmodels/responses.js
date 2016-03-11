import mongoose from 'mongoose';

const ResponseSchema = new mongoose.Schema({
  type: String,
  features: [],
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
});

export default mongoose.model('response', ResponseSchema);
