import Joi, {number} from "joi";

const cartSchema = Joi.object({
    id: Joi.string().length(36),
    items: Joi.array().items(
        {
            product: {
                id: Joi.string().length(36),
                title: Joi.string().min(1).max(100),
                description: Joi.string().min(1).max(1000),
                price: Joi.number().min(0.01).max(99999)
            },
            count: Joi.number().min(1).max(99)
        }
    )
})

export const validateCart = async (req, res, next) => {
    try{
        await cartSchema.validateAsync(req.body);
        next();
    }
    catch(error) {
        res.status(400);
        console.log("cart validation error")
        next({message: error.message, code: 400});
    }
}