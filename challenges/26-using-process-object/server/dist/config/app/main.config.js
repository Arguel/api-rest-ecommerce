"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var mongodb_db_1 = require("../database/mongodb.db");
var passport_1 = __importDefault(require("passport"));
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
// Environment Variables
dotenv_1.default.config();
var defaultMain = function (app) {
    // Middlewares
    if (process.env.NODE_ENV !== "test")
        app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.text());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(passport_1.default.initialize());
    app.use((0, express_session_1.default)({
        store: connect_mongo_1.default.create({
            mongoUrl: process.env.MONGO_URI,
            mongoOptions: mongodb_db_1.mongoOptions,
        }),
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 10 * 60 * 1000,
            httpOnly: false,
            secure: false,
        },
        rolling: true,
    }));
    app.use(passport_1.default.session());
    // Handlebars
    app.engine("hbs", (0, express_handlebars_1.default)({
        extname: ".hbs",
        defaultLayout: "main.hbs",
        layoutsDir: path_1.default.join(__dirname, "..", "..", "views", "layouts"),
        partialsDir: path_1.default.join(__dirname, "..", "..", "views", "partials"),
    }));
    // Engines
    app.set("view engine", "hbs");
    app.set("views", path_1.default.join(__dirname, "..", "..", "views"));
    // Static files
    app.use(express_1.default.static(path_1.default.join(__dirname, "..", "..", "public")));
};
exports.default = defaultMain;
