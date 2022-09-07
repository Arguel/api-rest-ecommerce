"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const imagesFolderPath = path_1.default.resolve(__dirname, "../../images");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesFolderPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
module.exports = multer_1.default({ storage: storage });
//# sourceMappingURL=multer.js.map