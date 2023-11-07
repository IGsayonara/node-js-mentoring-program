import { Router } from 'express';
import { productRouter } from './products.route.ts';
import { cartRouter } from './cart.route.ts';
import { userAuth } from '../middleware/user-auth.middleware.ts';
import { formatResponse } from '../middleware/response.middleware.ts';
import { authRouter } from './auth.route.ts';
import { healthCheck } from '../controllers/health.controller.ts';

export const appRouter = Router();

appRouter.use('/profile', userAuth);
appRouter.use('/', formatResponse);

appRouter.get('/health', healthCheck);
appRouter.use('/auth', authRouter);
appRouter.use('/products', productRouter);
appRouter.use('/profile/cart', cartRouter);
