import { Router } from 'express';
import { productRouter } from './products.route.ts';
import { cartRouter } from './cart.route.ts';
import { userAuth } from '../common/middleware/user-auth.middleware.ts';
import { formatResponse } from '../common/middleware/response.middleware.ts';
import { authRouter } from './auth.route.ts';
import { healthCheck } from '../controllers/health.controller.ts';
import { loggerMiddleware } from '../common/middleware/logger.middleware.ts';

export const appRouter = Router();

appRouter.use('/', loggerMiddleware);
appRouter.use('/profile', userAuth);
appRouter.use('/', formatResponse);

appRouter.get('/health', healthCheck);
appRouter.use('/auth', authRouter);
appRouter.use('/products', productRouter);
appRouter.use('/profile/cart', cartRouter);
