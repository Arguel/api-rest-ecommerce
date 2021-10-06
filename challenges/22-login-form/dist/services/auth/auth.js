"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProperties = void 0;
function userProperties(req, res, next) {
    // We add to the request the user field with all its properties
    req.body.user = {
        login: true,
        isAdmin: true,
    };
    next();
}
exports.userProperties = userProperties;
