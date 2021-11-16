"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.ViewsController = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const calculations_1 = require("../libs/helpers/calculations");
const ViewsController = /** @class */ (function () {
    function ViewsController() {
    }
    ViewsController.prototype.getRoot = function (req, res) {
        const _a = req.user; const displayName = _a.displayName; const emails = _a.emails; const photos = _a.photos;
        res.status(200).render("index", {
            name: displayName,
            email: emails[0].value,
            picture: photos[0].value,
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
        const defaultNumber = 100000000;
        const qty = req.query.qty;
        const startMode = process.argv[5];
        if (startMode === "cluster") {
            const totalNumbers = (0, calculations_1.randomNum)(qty);
            res.status(200).json({totalNumbers: totalNumbers});
        } else {
            const forked = (0, child_process_1.fork)(path_1.default.join("server", "dist", "libs", "helpers", "calculate.js"));
            if (qty)
                forked.send(qty);
            else
                forked.send(defaultNumber);
            forked.on("message", function (result) {
                res.status(200).json({result: result});
            });
        }
    };
    return ViewsController;
}());
exports.ViewsController = ViewsController;
