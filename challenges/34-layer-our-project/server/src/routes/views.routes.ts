import {Router, IRouter} from "express";
import {isAuthenticated} from "../services/auth/auth";
import {ViewsController} from "../controller/views.controllers";

const controller: ViewsController = new ViewsController();

const router: IRouter = Router();

router.get("api/info", controller.getInfo);

router.get("api/randoms", controller.getRandoms);

router.get("/", isAuthenticated, controller.getRoot);

export default router;
