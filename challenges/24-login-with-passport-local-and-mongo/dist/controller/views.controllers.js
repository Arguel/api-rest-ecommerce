"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewsController = void 0;
var path_1 = __importDefault(require("path"));
var ViewsController = /** @class */ (function () {
    function ViewsController() {
    }
    ViewsController.prototype.getLogin = function (req, res) {
        res.sendFile("login.html", { root: path_1.default.join(".", "dist", "views") });
    };
    ViewsController.prototype.postLogin = function (req, res) {
        var _a = req.body, username = _a.username, password = _a.password;
        if (username && password) {
            req.session.username = username;
            req.session.password = password;
            res.redirect("/");
        }
        else {
            res.send("Invalid data, please enter a valid name");
        }
    };
    ViewsController.prototype.getFailLogin = function (req, res) {
        res.sendFile("loginError.html", { root: path_1.default.join(".", "dist", "views") });
    };
    ViewsController.prototype.getRegister = function (req, res) {
        res.sendFile("register.html", { root: path_1.default.join(".", "dist", "views") });
    };
    ViewsController.prototype.postRegister = function (req, res) {
        res.redirect("/login");
    };
    ViewsController.prototype.getFailRegister = function (req, res) {
        res.sendFile("registerError.html", { root: path_1.default.join(".", "dist", "views") });
    };
    ViewsController.prototype.getLogout = function (req, res) {
        req.session.destroy(function (err) {
            if (err)
                res.status(500).json({
                    error: 500,
                    description: "Unexpected error on the server side. Please try again later",
                });
            else
                res.sendFile("logout.html", { root: path_1.default.join(".", "dist", "views") });
        });
    };
    ViewsController.prototype.getRoot = function (req, res) {
        res.sendFile("index.html", { root: path_1.default.join(".", "dist") });
    };
    return ViewsController;
}());
exports.ViewsController = ViewsController;
