import express from "express";
import morgan from "morgan";
import path from "path";
import productsRoutes from "./routes/products.routes";
import cartRoutes from "./routes/cart.routes";
import {userProperties} from "./middlewares/auth";
import dotenv from "dotenv";

// Environment Variables
dotenv.config();

// Main application
const app: express.Application = express();

// Settings
app.set("port", process.env.PORT || 8080);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.use("/products", userProperties, productsRoutes);
app.use("/cart", cartRoutes);
// This manages the non-existent routes
app.get("*", (req: express.Request, res: express.Response) => {
  res.status(404).json({
    error: 404,
    description: `Route '${req.originalUrl}' - Method '${req.method}' not found`,
  });
});

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Example app listening at http://localhost:${app.get("port")}`);
});
