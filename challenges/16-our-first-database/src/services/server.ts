import { errorHandler, notFound } from "../middleware/errorHandler";
import { create } from "express-handlebars";
import indexRouter from "../routes/index";
import { Server } from "http";
import express from "express";
import path from "path";

export const app = express();

export const hbs = create({
  extname: "hbs",
  layoutsDir: path.resolve(__dirname, "../../views/layouts"),
  defaultLayout: path.resolve(__dirname, "../../views/layouts/main"),
  partialsDir: path.resolve(__dirname, "../../views/partial"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "../../views"));

const publicFolderPath = path.resolve(__dirname, "../../public");
app.use(express.static(publicFolderPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRouter);

app.use(notFound);
app.use(errorHandler);

export const httpServer = new Server(app);
