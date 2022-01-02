"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = require("express");
const auth_controllers_1 = require("../controller/auth.controllers");
const passport_1 = __importDefault(require("passport"));
require("../services/auth/strategies/passport.facebook");
const controller = new auth_controllers_1.AuthController();
const router = (0, express_1.Router)();
router.get("/login", controller.getLogin.bind(controller));
router.get("/facebook", passport_1.default.authenticate("facebook"));
router.get("/facebook/callback", passport_1.default.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
}));
router.get("/faillogin", controller.getFailLogin.bind(controller));
router.get("/register", controller.getRegister.bind(controller));
router.get("/failregister", controller.getFailRegister.bind(controller));
router.get("/logout", controller.getLogout.bind(controller));
exports.default = router;
