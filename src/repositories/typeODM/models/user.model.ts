import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: String,
  activeCart: {
    type: Schema.Types.String || null,
    ref: 'Cart',
  },
  orders: [
    {
      type: Schema.Types.String,
      ref: 'Order',
    },
  ],
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
