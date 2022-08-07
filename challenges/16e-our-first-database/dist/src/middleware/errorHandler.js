"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    req.statusCode = 400;
    next(error);
};
exports.notFound = notFound;
const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    else if (error.code === "ENOENT") {
        res.status(req.statusCode || 500).render("pageNotFound");
        return;
    }
    res.status(req.statusCode || 500).send({
        Error: {
            code: error.code,
            msg: error.message,
        },
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map