"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const defaultError = function (app) {
    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        const err = new Error("Not Found");
        err.status = 404;
        next(err);
    });
    // Development error handler (will print stacktrace)
    if (app.get("env") === "development")
        app.use(function (err, req, res, next) {
            res.status(err.status || 500).send({
                message: err.message,
                error: err,
            });
        });
    // Production error handler (no stacktraces leaked to user)
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).send({
            message: err.message,
            error: {},
        });
    });
};
exports.default = defaultError;
