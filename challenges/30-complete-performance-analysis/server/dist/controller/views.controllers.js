"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewsController = void 0;
var os_1 = __importDefault(require("os"));
var calculations_1 = require("../libs/helpers/calculations");
var ViewsController = /** @class */ (function () {
    function ViewsController() {
    }
    ViewsController.prototype.getLogin = function (req, res) {
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
    ViewsController.prototype.getFailLogin = function (req, res) {
        res.status(200).render("loginError");
    };
    ViewsController.prototype.getRegister = function (req, res) {
        res.status(200).render("register");
    };
    /*
     *postRegister(req: Request, res: Response): void {
     *  res.redirect("/login");
     *}
     */
    ViewsController.prototype.getFailRegister = function (req, res) {
        res.status(200).render("registerError");
    };
    ViewsController.prototype.getLogout = function (req, res) {
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
    ViewsController.prototype.getRoot = function (req, res) {
        var _a = req.user, displayName = _a.displayName, emails = _a.emails, photos = _a.photos;
        res.status(200).render("index", {
            name: displayName,
            email: emails[0].value,
            picture: photos[0].value,
        });
    };
    ViewsController.prototype.getInfo = function (req, res) {
        var info = {
            Input_arguments: process.argv,
            Platform_name: process.platform,
            Node_js_version: process.version,
            Memory_usage: process.memoryUsage(),
            Execution_path: process.execPath,
            Process_id: process.pid,
            Current_folder: process.cwd(),
            NumCPUs: os_1.default.cpus().length,
            asd: 4,
        };
        console.log(info);
        res.status(200).json(info);
    };
    ViewsController.prototype.getRandoms = function (req, res) {
        var defaultNumber = 100000000;
        var qty = req.query.qty;
        var startMode = process.argv[5];
        if (startMode === "cluster") {
            var totalNumbers = (0, calculations_1.randomNum)(qty);
            res.status(200).json({ totalNumbers: totalNumbers });
        }
        else {
            //const forked = fork(
            //path.join("server", "dist", "libs", "helpers", "calculate.js"),
            //);
            //if (qty) forked.send(qty as string);
            //else forked.send(defaultNumber);
            //forked.on("message", (result) => {
            //res.status(200).json({result});
            //});
            res.status(200).json({ Status: "randoms" });
        }
    };
    return ViewsController;
}());
exports.ViewsController = ViewsController;
