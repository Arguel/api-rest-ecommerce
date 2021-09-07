"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.isAdmin = exports.userProperties = void 0;
function userProperties(req, res, next) {
    req.body.user = {
        login: true,
        isAdmin: true,
    };
    next();
}
exports.userProperties = userProperties;
function isAdmin(req, res, next) {
    const user = req.body.user;
    if (user.isAdmin)
        next();
    else
        res.status(401).json({
            error: 401,
            description: "Route '" + req.originalUrl + "' - Method '" + req.method + "' unauthorized",
        });
}
exports.isAdmin = isAdmin;
