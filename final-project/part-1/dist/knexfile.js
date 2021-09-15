"use strict";
// Update with your config settings.
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexfile = void 0;
exports.knexfile = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./dist/db/myFirstDatabase.db",
        },
        useNullAsDefault: true,
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
};
