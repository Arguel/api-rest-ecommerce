import {IConfig} from "config";
import dotenv from "dotenv";

// Environment Variables
dotenv.config();

const port: string = process.argv[2];
const appId: string = process.argv[3];
const appSecret: string = process.argv[4];
const startMode: string = process.argv[5];
const initiator: string = process.argv[6];

export interface IConfigDefault extends IConfig {
  default: {
    // Used on the express server
    app: {
      host: string;
      port: string;
      startMode: "cluster" | "fork";
      initiator: "forever" | "pm2";
      startMsg: string;
      secretKey: string;
    };
    // Used on the database server
    db: {
      mongodb: {
        mongoUri: string;
      };
      mysql: {
        mysqlUri: string;
      };
    };
    // Used on the facebook application
    facebookApp: {
      appId: string;
      appSecret: string;
    };
  };
}

const config = {
  // Used on the express server
  app: {
    host: process.env.HOST || process.env.CUSTOM_HOST || "0.0.0.0",
    port: port || process.env.PORT || process.env.CUSTOM_PORT || "8080",
    startMode: startMode || "fork",
    initiator: initiator || "forever",
    startMsg: "Example app listening at {0}", // {0} = placeholder
    secretKey: process.env.SECRET_KEY,
  },
  // Used on the database server
  db: {
    mongodb: {
      mongoUri: process.env.MONGO_URI,
    },
    mysql: {
      mysqlUri: process.env.MYSQL_URI,
    },
  },
  // Used on the facebook application
  facebookApp: {
    appId: appId || process.env.FACEBOOK_APP_ID,
    appSecret: appSecret || process.env.FACEBOOK_APP_SECRET,
  },
};

export default config;
