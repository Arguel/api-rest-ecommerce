import {Router, IRouter} from "express";
import {AuthController} from "../controller/auth.controllers";
import passport from "passport";
import "../services/auth/strategies/passport.facebook";
import "../services/auth/strategies/passport.local";

const controller: AuthController = new AuthController();

const router: IRouter = Router();

router.get("/login", controller.getLogin);

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/auth/faillogin",
  }),
  controller.postLogin,
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  }),
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/api/auth/login",
  }),
  controller.postLogin,
);

router.get("/faillogin", controller.getFailLogin);

router.get("/register", controller.getRegister);

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/auth/failregister",
  }),
  controller.postLogin,
);

router.get("/failregister", controller.getFailRegister);

router.get("/logout", controller.getLogout);

export default router;
