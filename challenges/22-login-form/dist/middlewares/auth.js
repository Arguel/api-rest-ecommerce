"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.isAdmin = exports.userProperties = void 0;
function userProperties(req, res, next) {
    // We add to the request the user field with all its properties
    req.body.user = {
        login: true,
        isAdmin: true,
    };
    next();
}
exports.userProperties = userProperties;
function isAdmin(req, res, next) {
    const user = req.body.user;
    // We check if the user is admin and if it is not we throw an error
    if (user.isAdmin)
        next();
    else
        res.status(401).json({
            error: 401,
            description: "Route '" + req.originalUrl + "' - Method '" + req.method + "' unauthorized",
        });
}
exports.isAdmin = isAdmin;
