import mongoose from 'mongoose';
import productSchema from './schemas/product.schema.ts';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const orderSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  cartId: String,
  items: [
    {
      product: productSchema,
      count: Number,
    },
  ],
  payment: {
    type: Schema.Types.Mixed,
    address: Schema.Types.Mixed,
    creditCard: Schema.Types.Mixed,
  },
  delivery: {
    type: Schema.Types.Mixed,
    address: Schema.Types.Mixed,
  },
  comments: String,
  status: String, // Should validate to 'created' or 'completed'
  total: Number,
  user: {
    type: String,
    ref: 'User',
  },
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
