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
        if (req.isAuthenticated()) {
            ethereal_1.etherealMailer.mailOptions.subject = "log in " + req.user.displayName + " - date: " + new Date().toString();
            ethereal_1.etherealMailer.transporter.sendMail(ethereal_1.etherealMailer.mailOptions, function (err, info) {
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
    AuthController.prototype.getFailRegister = function (req, res) {
        res.status(200).render("registerError");
    };
    AuthController.prototype.getLogout = function (req, res) {
        ethereal_1.etherealMailer.mailOptions.subject = "log out " + req.user.displayName + " - date: " + new Date().toString();
        ethereal_1.etherealMailer.transporter.sendMail(ethereal_1.etherealMailer.mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                return err;
            }
            console.log(info);
        });
        var displayName = req.user.displayName;
        req.session.destroy(function (err) {
            if (err)
                res.status(500).json({
                    error: 500,
                    description: "Unexpected error on the server side. Please try again later",
                });
            else
                res.status(200).render("logout", { displayName: displayName });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
