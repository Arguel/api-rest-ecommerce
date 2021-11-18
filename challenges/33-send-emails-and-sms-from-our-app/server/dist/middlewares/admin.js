"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.isAdmin = void 0;
function isAdmin(req, res, next) {
    // We check if the user is admin and if it is not we throw an error
    // req.session.user.isAdmin
    if (req.user && req.user.isAdmin)
        next();
    else
        res.status(401).json({
            error: 401,
            description: "Route '" + req.originalUrl + "' - Method '" + req.method + "' unauthorized",
        });
}
exports.isAdmin = isAdmin;
