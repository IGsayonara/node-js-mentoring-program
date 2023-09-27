import {Controller} from "./controller.ts";
import HobbyEntity from "./hobby.entity.ts";
import {addToCache, getCache, resetCache} from "./hobby.cache.ts";

const hobbyEntity = new HobbyEntity();
const hobbyController = new Controller();

hobbyController.addOptions({
    'GET': {
        '/hobbies/:id/all': async ({req, res, body, query}) => {
            if(req.headers['cache-control'] !== 'no-cache' && getCache(query.id)){
                res.end(JSON.stringify(getCache(query.id)));
                return;
            }

            const hobbies = await hobbyEntity.getAll(parseInt(query.id));
            addToCache(query.id, hobbies);

            res.end(JSON.stringify(hobbies));
        }
    },
    'POST': {
        '/hobbies/:id/add': async ({req, res, body, query}) => {
            resetCache(query.id);
            res.end(JSON.stringify(await hobbyEntity.add(parseInt(query.id), body.hobby)));
        }
    },
    'DELETE': {
        '/hobbies/:id/delete': async ({req, res, body, query}) => {
            resetCache(query.id);
            res.end(JSON.stringify(await hobbyEntity.delete(parseInt(query.id), body.hobby)));
        }
    }
})

export default hobbyController;