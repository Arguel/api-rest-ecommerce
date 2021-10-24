"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewsController = void 0;
var ViewsController = /** @class */ (function () {
    function ViewsController() {
    }
    ViewsController.prototype.getLogin = function (req, res) {
        res.render("login");
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
    ViewsController.prototype.getFailLogin = function (req, res) {
        res.render("loginError");
    };
    ViewsController.prototype.getRegister = function (req, res) {
        res.render("register");
    };
    /*
     *postRegister(req: Request, res: Response): void {
     *  res.redirect("/login");
     *}
     */
    ViewsController.prototype.getFailRegister = function (req, res) {
        res.render("registerError");
    };
    ViewsController.prototype.getLogout = function (req, res) {
        req.session.destroy(function (err) {
            if (err)
                res.status(500).json({
                    error: 500,
                    description: "Unexpected error on the server side. Please try again later",
                });
            else
                res.render("logout");
        });
    };
    ViewsController.prototype.getRoot = function (req, res) {
        var _a = req.session, name = _a.name, email = _a.email, picture = _a.picture;
        res.render("index", { name: name, email: email, picture: picture });
    };
    return ViewsController;
}());
exports.ViewsController = ViewsController;
