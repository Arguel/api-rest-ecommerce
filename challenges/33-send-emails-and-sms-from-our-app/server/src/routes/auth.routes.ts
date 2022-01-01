import {Router, IRouter} from "express";
import {AuthController} from "../controller/auth.controllers";
import passport from "passport";
import "../services/auth/strategies/passport.facebook";
import "../services/auth/strategies/passport.local";

const controller: AuthController = new AuthController();

const router: IRouter = Router();

router.get("/login", controller.getLogin.bind(controller));

router.post(
  "/login",
  passport.authenticate("login", {failureRedirect: "/api/auth/faillogin"}),
  controller.postLogin.bind(controller),
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {failureRedirect: "/api/auth/login"}),
  controller.postLogin.bind(controller),
);

router.get("/faillogin", controller.getFailLogin.bind(controller));

router.get("/register", controller.getRegister.bind(controller));

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/auth/failregister",
  }),
  controller.postLogin.bind(controller),
  // controller.postRegister.bind(controller),
);

router.get("/failregister", controller.getFailRegister.bind(controller));

router.get("/logout", controller.getLogout.bind(controller));

export default router;
