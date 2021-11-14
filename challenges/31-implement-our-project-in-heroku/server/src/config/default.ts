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
    app: {
      port: string;
      startMode: "cluster" | "fork";
      initiator: "forever" | "pm2";
      secretKey: string;
    };
    db: {
      mongodb: {
        connectionString: string;
      };
      mysql: {
        connectionString: string;
      };
    };
    facebookApp: {
      appId: string;
      appSecret: string;
    };
  };
}

const config = {
  app: {
    port: port || process.env.PORT || "8080",
    startMode: startMode || "fork",
    initiator: initiator || "forever",
    secretKey: process.env.SECRET_KEY,
  },
  db: {
    mongodb: {
      connectionString: process.env.MONGO_URI,
    },
    mysql: {
      connectionString: process.env.MYSQL_URI,
    },
  },
  facebookApp: {
    appId: appId || process.env.FACEBOOK_APP_ID,
    appSecret: appSecret || process.env.FACEBOOK_APP_SECRET,
  },
};

export default config;
