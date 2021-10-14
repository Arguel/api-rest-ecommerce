import express from "express";
import * as http from "http";
import {Server} from "socket.io";
import morgan from "morgan";
import path from "path";
import productsRoutes from "./routes/products.routes";
import cartRoutes from "./routes/cart.routes";
import viewsRoutes from "./routes/views.routes";
import notFound from "./routes/not-found.routes";
import dotenv from "dotenv";
import {socketIo} from "./services/socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import {mongoOptions} from "./config/mongodb.db";
import passport from "passport";

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
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      mongoOptions,
    }),
    secret: "my_secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 120 * 1000, // Milliseconds
      httpOnly: false,
      secure: false,
    },
    rolling: true,
  }),
);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/", viewsRoutes);
// This manages the non-existent routes
app.use("*", notFound);

// Io socket connection
socketIo(io);

// Starting the server
httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
