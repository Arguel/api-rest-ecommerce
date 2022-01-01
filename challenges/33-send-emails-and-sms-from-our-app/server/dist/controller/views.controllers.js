"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewsController = void 0;
var child_process_1 = require("child_process");
var path_1 = __importDefault(require("path"));
var os_1 = __importDefault(require("os"));
var calculations_1 = require("../libs/helpers/calculations");
var config_1 = __importDefault(require("config"));
var startMode = config_1.default.default.app.startMode;
var ViewsController = /** @class */ (function () {
    function ViewsController() {
    }
    ViewsController.prototype.getRoot = function (req, res) {
        var _a = req.user, displayName = _a.displayName, emails = _a.emails, photos = _a.photos;
        console.log(req.user);
        res.status(200).render("index", {
            name: displayName ? displayName : "undefined",
            email: emails && emails[0].value ? emails[0].value : "undefined",
            picture: photos && photos[0].value ? photos[0].value : "undefined",
        });
    };
    ViewsController.prototype.getInfo = function (req, res) {
        res.status(200).json({
            Input_arguments: process.argv,
            Platform_name: process.platform,
            Node_js_version: process.version,
            Memory_usage: process.memoryUsage(),
            Execution_path: process.execPath,
            Process_id: process.pid,
            Current_folder: process.cwd(),
            NumCPUs: os_1.default.cpus().length,
            asd: 4,
        });
    };
    ViewsController.prototype.getRandoms = function (req, res) {
        var defaultNumber = 100000000;
        var qty = req.query.qty;
        if (startMode === "cluster") {
            var totalNumbers = (0, calculations_1.randomNum)(qty);
            res.status(200).json({ totalNumbers: totalNumbers });
        }
        else {
            var forked = (0, child_process_1.fork)(path_1.default.join("server", "dist", "libs", "helpers", "calculate.js"));
            if (qty)
                forked.send(qty);
            else
                forked.send(defaultNumber);
            forked.on("message", function (result) {
                res.status(200).json({ result: result });
            });
        }
    };
    return ViewsController;
}());
exports.ViewsController = ViewsController;
