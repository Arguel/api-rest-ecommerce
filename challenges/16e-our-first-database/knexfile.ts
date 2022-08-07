import type { Knex } from "knex";

const DB_config: { [key: string]: Knex.Config } = {
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

export default DB_config;
