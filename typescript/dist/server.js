"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (const p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
const __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++)
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }

    return to.concat(ar || Array.prototype.slice.call(from));
  };
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const port = 3000;
const fs = require("fs");
const handlebars = require("express-handlebars");
// Products json
const productsData = fs.readFileSync(__dirname + "/products.json", "utf-8");
let products = JSON.parse(productsData.toString("utf-8"));
// Messages json
const messagesData = fs.readFileSync(__dirname + "/userMessages.json", "utf-8");
const messages = JSON.parse(messagesData.toString("utf-8"));
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
app.get("/", function (req, res) {
  res.render("index", {products: products, messages: messages});
});
app.get("/api/products", function (req, res) {
  if (products.length > 1)
    res.render("index", {products: products});
   else
    res.send("There are no products.");
});
app.get("/api/products/list/:id", function (req, res) {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1)
    res.render("products", {products: [products[productId]]});
   else
    res.send("Product not found");
});
app.post("/api/products", function (req, res) {
  const data = req.body;
  const newProduct = __assign(__assign({}, data), {id: products.length});
  products = __spreadArray(
    __spreadArray([], products, true),
    [newProduct],
    false,
  );
  res.render("products", {products: products});
  io.emit("newProduct", newProduct);
});
app.put("/api/products/update/:id", function (req, res) {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1) {
    products[productId] = __assign(__assign({}, req.body), {id: productId});
    res.render("products", {products: [products[productId]]});
  } else {
    res.send("Product not found");
  }
});
app.delete("/api/products/delete/:id", function (req, res) {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1) {
    const deletedItem = products.splice(productId, 1);
    res.render("products", {products: [deletedItem[0]]});
  } else {
    res.send("Product not found");
  }
});
io.on("connection", function (socket) {
  console.log("New connection");
  socket.on("newMessage", function (message) {
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
httpServer.listen(port, function () {
  console.log("Example app listening at http://localhost:" + port);
});
