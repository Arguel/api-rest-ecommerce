import {Router, IRouter} from "express";
import {AuthController} from "../controller/auth.controllers";
import passport from "passport";
import "../services/auth/strategies/passport.facebook";

const controller: AuthController = new AuthController();

const router: IRouter = Router();

router.get("/login", controller.getLogin.bind(controller));

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

router.get("/faillogin", controller.getFailLogin.bind(controller));

router.get("/register", controller.getRegister.bind(controller));

router.get("/failregister", controller.getFailRegister.bind(controller));

router.get("/logout", controller.getLogout.bind(controller));

export default router;
