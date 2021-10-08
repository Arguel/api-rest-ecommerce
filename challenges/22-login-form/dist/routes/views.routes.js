"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var router = (0, express_1.Router)();
router.get("/login", function (req, res) {
    res.sendFile("login.html", { root: path_1.default.join(".", "src", "views") });
});
router.post("/login/validate", function (req, res) {
    var username = req.body.username;
    if (username)
        req.session.user.name = username;
});
router.get("/", function (req, res) {
    res.sendFile("index.html", { root: path_1.default.join(".", "src") });
});
exports.default = router;
