import {Router, IRouter} from "express";
import {auth} from "../services/auth/auth";
import {ViewsController} from "../controller/views.controllers";
import passport from "passport";
import LocalStrategy from "passport-local";

const controller: ViewsController = new ViewsController();

const router: IRouter = Router();

router.get("/login", controller.getLogin.bind(controller));

router.post(
  "/login",
  passport.authenticate("login", {failureRedirect: "/faillogin"}),
  controller.postLogin.bind(controller),
);

router.get("/faillogin", controller.getFailLogin.bind(controller));

router.get("/register", controller.getRegister.bind(controller));

router.post(
  "/register",
  passport.authenticate("register", {failureRedirect: "/failregister"}),
);

router.get("/failregister", controller.getFailRegister.bind(controller));

router.get("/logout", controller.getLogout.bind(controller));

router.get("/", auth, controller.getRoot.bind(controller));

export default router;
