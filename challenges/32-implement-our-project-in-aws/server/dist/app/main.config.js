"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const mongodb_db_1 = require("../database/mongodb.db");
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const compression_1 = __importDefault(require("compression"));
const config_1 = __importDefault(require("config"));
const _a = config_1.default.default; const secretKey = _a.app.secretKey; const mongoUri = _a.db.mongodb.mongoUri;
const defaultMain = function (app) {
    // Middlewares
    if (process.env.NODE_ENV !== "test")
        app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.text());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({extended: true}));
    app.use(passport_1.default.initialize());
    app.use((0, express_session_1.default)({
        store: connect_mongo_1.default.create({
            mongoUrl: mongoUri,
            mongoOptions: mongodb_db_1.mongoOptions,
        }),
        secret: secretKey,
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
    app.use((0, compression_1.default)());
    // Handlebars
    app.engine("hbs", (0, express_handlebars_1.default)({
        extname: ".hbs",
        defaultLayout: "main.hbs",
        layoutsDir: path_1.default.join(__dirname, "..", "views", "layouts"),
        partialsDir: path_1.default.join(__dirname, "..", "views", "partials"),
    }));
    // Engines
    app.set("view engine", "hbs");
    app.set("views", path_1.default.join(__dirname, "..", "views"));
    // Static files
    app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
};
exports.default = defaultMain;
