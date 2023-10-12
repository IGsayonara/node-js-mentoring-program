import {getUserById} from "../repositories/user.repository.ts";

export const userAuth = async (req, res, next) => {
    try {
        const userId = req.headers['x-user-id'];
        req.user = await getUserById(userId)
        next();
    } catch {
        next({
            message: "Header x-user-id is missing or no user with such id",
            code: 401,
        })

    }
}