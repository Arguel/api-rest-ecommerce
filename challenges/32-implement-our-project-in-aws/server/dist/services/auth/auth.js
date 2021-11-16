"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.isAuthenticated = void 0;
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        next();
    else
        res.redirect(308, "/login");
    // else res.send("First you need to log into your account");
}
exports.isAuthenticated = isAuthenticated;
