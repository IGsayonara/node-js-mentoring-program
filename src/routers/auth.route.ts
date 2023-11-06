import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller.ts';

export const authRouter = Router();

authRouter.post('/sign-in', AuthController.signIn);
authRouter.post('/sign-up', AuthController.signUp);
