import {Router, IRouter} from "express";
import {auth} from "../services/auth/auth";
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

router.get("/", auth, controller.getRoot.bind(controller));

export default router;
