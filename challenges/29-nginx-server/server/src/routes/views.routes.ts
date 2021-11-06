import {Router, IRouter} from "express";
import {isAuthenticated} from "../services/auth/auth";
import {ViewsController} from "../controller/views.controllers";
import passport from "passport";
import "../services/auth/strategies/passport.facebook";

const controller: ViewsController = new ViewsController();

const router: IRouter = Router();

router.get("/login", controller.getLogin.bind(controller));

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

router.get("/faillogin", controller.getFailLogin.bind(controller));

router.get("/register", controller.getRegister.bind(controller));

router.get("/failregister", controller.getFailRegister.bind(controller));

router.get("/logout", controller.getLogout.bind(controller));

router.get("/info", controller.getInfo.bind(controller));

router.get("/randoms", controller.getRandoms.bind(controller));

router.get("/", isAuthenticated, controller.getRoot.bind(controller));

export default router;
