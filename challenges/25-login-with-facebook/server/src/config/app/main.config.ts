import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import {mongoOptions} from "../database/mongodb.db";
import passport from "passport";
import express from "express";

// Environment Variables
dotenv.config();

const defaultMain = (app: express.Application) => {
  // Middlewares
  if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

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

  // Static files
  app.use(express.static(path.join(__dirname, "..", "..", "public")));
};

export default defaultMain;
