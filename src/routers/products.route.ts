import { Router } from 'express';
import * as productController from '../controllers/products.controller.ts';

export const productRouter = Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProduct);
