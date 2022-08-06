"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        next();
    else
        res.redirect(308, "/api/auth/login");
}
exports.isAuthenticated = isAuthenticated;
