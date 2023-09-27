import {mergeDeep} from "./deep.merge.util.ts";
import {getPostData} from "./request-data.util.ts";
import {stop} from "./timeout.util.ts";

export type Method =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'OPTIONS'

export type controllerCallback = ({req, res, query, body}) => void

export type Option = Record<string, controllerCallback>

type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

export class Controller {
    private options: PartialRecord<Method, Option> = {}
    constructor(...controllers: Controller[]) {
        const allChildOptions = controllers.map((controller) => {
            return controller.options;
        })

        allChildOptions.forEach((childOptions) => {
            mergeDeep(this.options, childOptions);
        })
    }

    addOptions(options: PartialRecord<Method, Option>){
        this.options = {
            ...this.options,
            ...options,
        }
    }
    async execute(req, res) {
        try {
            const body = await getPostData(req);
            const { callback, query } = this.getCallback(req);
            res.statusCode = 200;
            callback({req, res, body, query});
        } catch (error) {
            console.error('error', error);
            res.statusCode = error.code || 500;
            res.end(error.message);
        }
    }

    private getCallback(req): { callback:  controllerCallback, query: Record<string, string> } {
        try {
            const methodOptions = this.options[req.method as Method]
            const routes = Object.keys(methodOptions);
            const queryParamRegex = /:\w+/g;

            const key = routes.find((key) => {
                const routeForRegex = key.replaceAll(queryParamRegex, "\\w+");
                const regexFromRoute = new RegExp(`${routeForRegex}`, "g");

                return req.url.match(regexFromRoute);
            });

            if (key) {
                const query = {}
                const splitUrl =  req.url.split('/');

                key.split('/').forEach((chunk, index) => {
                    if(chunk.startsWith(':')){
                        query[chunk.slice(1)] = splitUrl[index];
                    }
                })

                return { callback: methodOptions[key], query };
            }

            throw {message: 'Route is not found', code: 404};
        } catch {
            throw {message: 'Route is not found', code: 404};
        }
    }
}