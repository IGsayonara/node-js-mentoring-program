import {Controller} from "../core/controller.ts";
import UserEntity from "../entities/user.entity.ts";

const userEntity = new UserEntity();
const userController = new Controller();

userController.addOptions({
    'GET': {
        '/user/all': ({req, res, body, query}) => {
            res.end(JSON.stringify(userEntity.getAll()));
        },
        '/user/:id': ({req, res, body, query}) => {
            res.end(JSON.stringify(userEntity.getOne(parseInt(query.id))));
        },
    },
    'POST': {
        '/user/add': ({req, res, body, query}) => {
            res.end(JSON.stringify(userEntity.add(body)));
        }
    },
    'PUT': {
        '/user/:id': ({req, res, body, query}) => {
            res.end(JSON.stringify(userEntity.update(parseInt(query.id), body)));
        }
    },
    'DELETE': {
        '/user/:id': ({req, res, body, query}) => {
            userEntity.delete(parseInt(query.id));
            res.end(JSON.stringify(userEntity.getAll()));
        }
    }
})

export default userController;