"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
// In case the routes are not found
var notFound = function (req, res) {
    res.status(404).json({
        error: 404,
        description: "Route '" + req.originalUrl + "' - Method '" + req.method + "' not found",
    });
};
router.get("/", notFound);
router.post("/", notFound);
router.put("/", notFound);
router.patch("/", notFound);
router.delete("/", notFound);
exports.default = router;
