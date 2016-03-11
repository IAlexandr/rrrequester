import { Schema, model } from 'mongoose';

const ResponseSchema = new Schema({
  type: String,
  features: [],
  requestId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});

export default model('Responses', ResponseSchema);
