import config from "config";
import {IConfigDefault} from "../config/default";

// Update with your config settings.

const {
  default: {
    db: {
      mysql: {mysqlUri},
    },
  },
} = config as IConfigDefault;

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
    connection: mysqlUri,
    pool: {min: 2, max: 10},
  },
};
