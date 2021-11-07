"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../services/auth/auth");
var views_controllers_1 = require("../controller/views.controllers");
var passport_1 = __importDefault(require("passport"));
require("../services/auth/strategies/passport.facebook");
var controller = new views_controllers_1.ViewsController();
var router = (0, express_1.Router)();
router.get("/login", controller.getLogin.bind(controller));
router.get("/auth/facebook", passport_1.default.authenticate("facebook"));
router.get("/auth/facebook/callback", passport_1.default.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
}));
router.get("/faillogin", controller.getFailLogin.bind(controller));
router.get("/register", controller.getRegister.bind(controller));
router.get("/failregister", controller.getFailRegister.bind(controller));
router.get("/logout", controller.getLogout.bind(controller));
router.get("/info", controller.getInfo.bind(controller));
router.get("/randoms", controller.getRandoms.bind(controller));
router.get("/", auth_1.isAuthenticated, controller.getRoot.bind(controller));
exports.default = router;
