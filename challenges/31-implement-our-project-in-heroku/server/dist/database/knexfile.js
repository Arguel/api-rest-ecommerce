"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexfile = void 0;
var config_1 = __importDefault(require("config"));
// Update with your config settings.
var mysqlUri = config_1.default.default.db.mysql.mysqlUri;
exports.knexfile = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./dev.sqlite3",
        },
    },
    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    mysql: {
        client: "mysql",
        connection: mysqlUri,
        pool: { min: 2, max: 10 },
    },
};
