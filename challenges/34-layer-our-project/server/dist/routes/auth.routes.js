"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controllers_1 = require("../controller/auth.controllers");
var passport_1 = __importDefault(require("passport"));
require("../services/auth/strategies/passport.facebook");
require("../services/auth/strategies/passport.local");
var controller = new auth_controllers_1.AuthController();
var router = (0, express_1.Router)();
router.get("/login", controller.getLogin);
router.post("/login", passport_1.default.authenticate("login", {
    failureRedirect: "/api/auth/faillogin",
}), controller.postLogin);
router.get("/facebook", passport_1.default.authenticate("facebook", {
    scope: ["email"],
}));
router.get("/facebook/callback", passport_1.default.authenticate("facebook", {
    failureRedirect: "/api/auth/login",
}), controller.postLogin);
router.get("/faillogin", controller.getFailLogin);
router.get("/register", controller.getRegister);
router.post("/register", passport_1.default.authenticate("register", {
    failureRedirect: "/api/auth/failregister",
}), controller.postLogin);
router.get("/failregister", controller.getFailRegister);
router.get("/logout", controller.getLogout);
exports.default = router;
