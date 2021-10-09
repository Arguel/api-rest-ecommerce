"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
function auth(req, res, next) {
    if (req.session.username)
        next();
    else
        res.redirect(308, "/login");
    // else res.send("First you need to log into your account");
}
exports.auth = auth;
