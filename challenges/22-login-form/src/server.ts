import express from "express";
import * as http from "http";
import {Server} from "socket.io";
import morgan from "morgan";
import path from "path";
import productsRoutes from "./routes/products.routes";
import cartRoutes from "./routes/cart.routes";
import notFound from "./routes/not-found.routes";
import {userProperties} from "./middlewares/auth";
import dotenv from "dotenv";
import {socketIo} from "./sockets/socket.io";
import cookieParser from "cookie-parser";

// Environment Variables
dotenv.config();

// Port
const port: number = parseInt(process.env.PORT!) || 8080;

// Main application
const app: express.Application = express();
const httpServer: http.Server = http.createServer(app);
// Websockets
const io: Server = new Server(httpServer, {
  /* options */
});

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
app.use("*", notFound);

// Io socket connection
socketIo(io);

// Starting the server
httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
