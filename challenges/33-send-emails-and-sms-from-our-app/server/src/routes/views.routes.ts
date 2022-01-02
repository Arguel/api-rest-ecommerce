import {Router, IRouter} from "express";
import {isAuthenticated} from "../services/auth/auth";
import {ViewsController} from "../controller/views.controllers";

const controller: ViewsController = new ViewsController();

const router: IRouter = Router();

router.get("api/info", controller.getInfo.bind(controller));

router.get("api/randoms", controller.getRandoms.bind(controller));

router.get("/", isAuthenticated, controller.getRoot.bind(controller));

export default router;
