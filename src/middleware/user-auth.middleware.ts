import {getUserById} from "../repositories/user.repository.ts";

export const userAuth = (req, res, next) => {
    const userId = req.headers['x-user-id'];
    if(!userId || !getUserById(userId)){
        res.status(401)
        res.json({
            data: null,
            error: {
                message: "Header x-user-id is missing or no user with such id"
            }
        })
    }
    else{
        next();
    }
}