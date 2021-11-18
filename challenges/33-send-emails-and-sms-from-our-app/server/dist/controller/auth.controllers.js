"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var ethereal_1 = require("../services/mailer/ethereal");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.getLogin = function (req, res) {
        res.status(200).render("login");
    };
    AuthController.prototype.postLogin = function (req, res) {
        // const {username, password} = req.body;
        if (req.isAuthenticated()) {
            // req.session.username = username;
            // req.session.password = password;
            ethereal_1.mailOptions.subject = "Login";
            ethereal_1.transporter.sendMail(ethereal_1.mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    return err;
                }
                console.log(info);
            });
            res.redirect("/api/");
        }
        else {
            res.send("Invalid data, please enter a valid name");
        }
    };
    AuthController.prototype.getFailLogin = function (req, res) {
        res.status(200).render("loginError");
    };
    AuthController.prototype.getRegister = function (req, res) {
        res.status(200).render("register");
    };
    AuthController.prototype.postRegister = function (req, res) {
        res.redirect("/api/auth/login");
    };
    AuthController.prototype.getFailRegister = function (req, res) {
        res.status(200).render("registerError");
    };
    AuthController.prototype.getLogout = function (req, res) {
        req.session.destroy(function (err) {
            if (err)
                res.status(500).json({
                    error: 500,
                    description: "Unexpected error on the server side. Please try again later",
                });
            else
                res.status(200).render("logout");
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
