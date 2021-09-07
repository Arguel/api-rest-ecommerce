import express from "express";
import * as http from "http";
import morgan from "morgan";
import path from "path";
import productsRoutes from "./routes/products.routes";
import cartRoutes from "./routes/cart.routes";
import "./database";
import {userProperties} from "./middlewares/auth";
const app: express.Application = express();
const server: http.Server = http.createServer(app);

// Settings
app.set("port", process.env.PORT || 8080);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.use("/products", userProperties, productsRoutes);
app.use("/cart", cartRoutes);
app.get("*", (req: express.Request, res: express.Response) => {
  res.status(404).json({
    error: 404,
    description: `Route '${req.originalUrl}' - Method '${req.method}' not found`,
  });
});

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Starting the server
server.listen(app.get("port"), () => {
  console.log(`Example app listening at http://localhost:${app.get("port")}`);
});
