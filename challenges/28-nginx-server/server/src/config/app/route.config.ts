import productsRoutes from "../../routes/products.routes";
import cartRoutes from "../../routes/cart.routes";
import viewsRoutes from "../../routes/views.routes";
import notFound from "../../routes/not-found.routes";
import {Application} from "express";

const defaultRoute = (app: Application) => {
  // Routes
  app.use("/products", productsRoutes);
  app.use("/cart", cartRoutes);
  app.use("/", viewsRoutes);
  // This manages the non-existent routes
  app.use("*", notFound);
};

export default defaultRoute;
