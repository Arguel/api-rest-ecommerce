"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.AuthController = void 0;
const AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.getLogin = function (req, res) {
        res.status(200).render("login");
    };
    /*
     *postLogin(req: Request, res: Response): void {
     *  const {username, password} = req.body;
     *  if (username && password) {
     *    req.session.username = username;
     *    req.session.password = password;
     *    res.redirect("/");
     *  } else {
     *    res.send("Invalid data, please enter a valid name");
     *  }
     *}
     */
    AuthController.prototype.getFailLogin = function (req, res) {
        res.status(200).render("loginError");
    };
    AuthController.prototype.getRegister = function (req, res) {
        res.status(200).render("register");
    };
    /*
     *postRegister(req: Request, res: Response): void {
     *  res.redirect("/login");
     *}
     */
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
