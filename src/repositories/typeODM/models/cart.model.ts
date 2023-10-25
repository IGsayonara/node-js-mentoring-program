import mongoose from 'mongoose';
import productSchema from './schemas/product.schema.ts';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const cartSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  isDeleted: Boolean,
  items: [
    {
      product: productSchema,
      count: Number,
    },
  ],
  user: {
    type: String,
    ref: 'User',
  },
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;
