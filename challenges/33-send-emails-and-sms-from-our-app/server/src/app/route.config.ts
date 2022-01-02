import productsRoutes from "../routes/products.routes";
import cartRoutes from "../routes/cart.routes";
import viewsRoutes from "../routes/views.routes";
import authRoutes from "../routes/auth.routes";
import notFound from "../routes/not-found.routes";
import {Application} from "express";

const defaultRoute = (app: Application) => {
  // Routes
  app.use("/api/products", productsRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/", viewsRoutes);
  // This manages the non-existent routes
  app.use("*", notFound);
};

export default defaultRoute;
