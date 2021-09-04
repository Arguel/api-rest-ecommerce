import express from "express";
import * as http from "http";
import * as socketIo from "socket.io";
import fs from "fs";
import handlebars from "express-handlebars";
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const io: socketIo.Server = new socketIo.Server(server);
const port: number = 3000;

// Products json
const productsData = fs.readFileSync(__dirname + "/products.json", "utf-8");
let products: Array<object> = JSON.parse(productsData.toString());
// Messages json
const messagesData = fs.readFileSync(__dirname + "/userMessages.json", "utf-8");
const messages: Array<object> = JSON.parse(messagesData.toString());

// Middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Handlebars
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  }),
);

// Engines
app.set("view engine", "hbs");
app.set("views", "./views");

// Static files
app.use(express.static("public"));

// Routes
app.get("/", (req: express.Request, res: express.Response) => {
  res.render("index", {products, messages});
});

app.get("/api/products", (req: express.Request, res: express.Response) => {
  if (products.length > 1) res.render("index", {products});
  else res.send("There are no products.");
});

app.get(
  "/api/products/list/:id",
  (req: express.Request, res: express.Response) => {
    const productId: number = parseInt(req.params.id);
    if (productId >= 0 && productId <= products.length - 1)
      res.render("products", {products: [products[productId]]});
    else res.send("Product not found");
  },
);

app.post("/api/products", (req: express.Request, res: express.Response) => {
  const data = req.body;
  const newProduct = {...data, id: products.length};
  products = [...products, newProduct];
  res.render("products", {products});
  io.emit("newProduct", newProduct);
});

app.put(
  "/api/products/update/:id",
  (req: express.Request, res: express.Response) => {
    const productId: number = parseInt(req.params.id);
    if (productId >= 0 && productId <= products.length - 1) {
      products[productId] = {...req.body, id: productId};
      res.render("products", {products: [products[productId]]});
    } else {
      res.send("Product not found");
    }
  },
);

app.delete(
  "/api/products/delete/:id",
  (req: express.Request, res: express.Response) => {
    const productId: number = parseInt(req.params.id);
    if (productId >= 0 && productId <= products.length - 1) {
      const deletedItem = products.splice(productId, 1);
      res.render("products", {products: [deletedItem[0]]});
    } else {
      res.send("Product not found");
    }
  },
);

io.on("connection", (socket) => {
  console.log("New connection");
  socket.on("newMessage", (message) => {
    messages.push(message);
    fs.writeFileSync(
      __dirname + "/userMessages.json",
      JSON.stringify(messages, null, "\t"),
      "utf-8",
    );
    io.emit("messages", messages);
  });
});

// Port
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
