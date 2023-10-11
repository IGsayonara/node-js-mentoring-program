import {CartEntity} from "../entities/cart.entity.ts";
import {countTotal} from "../helpers/count-total.ts";

export const formatCartResponse = (req, res, next) => {
    res.formattedSent = (cart: CartEntity) => {
        try {
            delete cart.isDeleted;

            const responseData = {
                cart,
                totalPrice: countTotal(cart),
            }

            res.json({data: responseData, error: null})
        }
        catch (error) {
            console.log("cart formatter error")
            next(error);
        }
    }
    next();
};
