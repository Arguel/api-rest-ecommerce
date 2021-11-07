import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import {mongoOptions} from "../database/mongodb.db";
import passport from "passport";
import express from "express";
import handlebars from "express-handlebars";
import compression from "compression";

// Environment Variables
dotenv.config();

const defaultMain = (app: express.Application) => {
  // Middlewares
  if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

  app.use(express.text());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use(passport.initialize());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        mongoOptions,
      }),
      secret: process.env.SECRET_KEY as string,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 10 * 60 * 1000, // Milliseconds - (Min * Sec * Mil)
        httpOnly: false,
        secure: false,
      },
      rolling: true,
    }),
  );
  app.use(passport.session());
  app.use(compression());

  // Handlebars
  app.engine(
    "hbs",
    handlebars({
      extname: ".hbs",
      defaultLayout: "main.hbs",
      layoutsDir: path.join(__dirname, "..", "..", "views", "layouts"),
      partialsDir: path.join(__dirname, "..", "..", "views", "partials"),
    }),
  );

  // Engines
  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "..", "..", "views"));

  // Static files
  app.use(express.static(path.join(__dirname, "..", "..", "public")));
};

export default defaultMain;
