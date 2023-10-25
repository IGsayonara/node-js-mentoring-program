import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const productSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  title: String,
  description: String,
  price: Number,
});

export default productSchema;
