import { Router } from 'express';
import { userAuth } from '../common/middleware/user-auth.middleware.ts';
import { formatResponse } from '../common/middleware/response.middleware.ts';
import { authRouter } from './auth.route.ts';

export const appRouter = Router();

appRouter.use('/profile', userAuth);
appRouter.use('/', formatResponse);

appRouter.use('/auth', authRouter);
