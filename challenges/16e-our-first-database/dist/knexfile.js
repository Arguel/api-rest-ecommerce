"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_config = {
    development: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "ecommerce",
        },
        migrations: {
            directory: __dirname + "/db/migrations",
        },
        seeds: {
            directory: __dirname + "/db/seeds",
        },
    },
    localStorage: {
        client: "sqlite3",
        connection: { filename: "./db/ecommerce.sqlite" },
        useNullAsDefault: true,
    },
};
exports.default = DB_config;
//# sourceMappingURL=knexfile.js.map