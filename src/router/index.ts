import {Router} from "express";
import {productRouter} from "./products.route.ts";
import {cartRouter} from "./cart.route.ts";
import {userAuth} from "../middleware/user-auth.middleware.ts";

export const appRouter = new Router();

appRouter.use('/', userAuth);

appRouter.use('/products', productRouter);
appRouter.use('/profile/cart', cartRouter);

