"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../services/auth/auth");
var path_1 = __importDefault(require("path"));
var router = (0, express_1.Router)();
router.get("/login", function (req, res) {
    res.sendFile("login.html", { root: path_1.default.join(".", "src", "views") });
});
router.post("/login/validate", function (req, res) {
    var username = req.body.username;
    if (username) {
        req.session.username = username;
        res.redirect("/");
    }
    else {
        res.send("Invalid data, please enter a valid name");
    }
});
router.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        if (err)
            res.status(500).json({
                error: 500,
                description: "Unexpected error on the server side. Please try again later",
            });
        else
            res.sendFile("logout.html", { root: path_1.default.join(".", "src", "views") });
    });
});
router.get("/", auth_1.auth, function (req, res) {
    res.sendFile("index.html", { root: path_1.default.join(".", "src") });
});
exports.default = router;
