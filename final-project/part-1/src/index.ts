import express from "express";
import * as http from "http";
import morgan from "morgan";
import path from "path";
import productsRoutes from "./routes/products.routes";
import cartRoutes from "./routes/cart.routes";
import "./database";
import {userProperties, isAdmin} from "./../middlewares/auth";
const app: express.Application = express();
const server: http.Server = http.createServer(app);

// Settings
app.set("port", process.env.PORT || 8080);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Starting the server
server.listen(app.get("port"), () => {
  console.log(`Example app listening at http://localhost:${app.get("port")}`);
});
