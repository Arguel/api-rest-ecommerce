import dotenv from "dotenv";

// Update with your config settings.

// Environment Variables
dotenv.config();

interface KnexConfig {
  [key: string]: object;
}

export const knexfile: KnexConfig = {
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
    connection: process.env.MYSQL_URI,
    pool: {min: 2, max: 10},
  },
};
