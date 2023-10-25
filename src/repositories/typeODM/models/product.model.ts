import mongoose from 'mongoose';
import productSchema from './schemas/product.schema.ts';

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
