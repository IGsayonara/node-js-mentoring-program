import {Controller} from "../core/controller.ts";
import userController from "./user.controller.ts";
import hobbyController from "./hobby.controller.ts";

export const mainController = new Controller(userController, hobbyController);