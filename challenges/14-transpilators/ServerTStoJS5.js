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
const __createBinding =
  (this && this.__createBinding) ||
  (Object.create ?
    function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      } :
    function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
const __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create ?
    function (o, v) {
        Object.defineProperty(o, "default", {enumerable: true, value: v});
      } :
    function (o, v) {
        o["default"] = v;
      });
const __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    const result = {};
    if (mod != null)
      for (const k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const socketIo = __importStar(require("socket.io"));
const fs_1 = __importDefault(require("fs"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const app = (0, express_1.default)();
const server = http.createServer(app);
const io = new socketIo.Server(server);
const port = 3000;
// Products json
const productsData = fs_1.default.readFileSync(
  __dirname + "/products.json",
  "utf-8",
);
let products = JSON.parse(productsData.toString());
// Messages json
const messagesData = fs_1.default.readFileSync(
  __dirname + "/userMessages.json",
  "utf-8",
);
const messages = JSON.parse(messagesData.toString());
// Middlewares
app.use(express_1.default.text());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({extended: true}));
// Handlebars
app.engine(
  "hbs",
  (0, express_handlebars_1.default)({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  }),
);
// Engines
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
// Static files
app.use(express_1.default.static(__dirname + "/public"));
// Routes
app.get("/", function (req, res) {
  res.render("index", {products: products, messages: messages});
});
app.get("/api/products", function (req, res) {
  if (products.length > 1) res.render("index", {products: products});
  else res.send("There are no products.");
});
app.get("/api/products/list/:id", function (req, res) {
  const productId = parseInt(req.params.id);
  if (productId >= 0 && productId <= products.length - 1)
    res.render("products", {products: [products[productId]]});
  else res.send("Product not found");
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
  const productId = parseInt(req.params.id);
  if (productId >= 0 && productId <= products.length - 1) {
    products[productId] = __assign(__assign({}, req.body), {id: productId});
    res.render("products", {products: [products[productId]]});
  } else {
    res.send("Product not found");
  }
});
app.delete("/api/products/delete/:id", function (req, res) {
  const productId = parseInt(req.params.id);
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
    fs_1.default.writeFileSync(
      __dirname + "/userMessages.json",
      JSON.stringify(messages, null, "\t"),
      "utf-8",
    );
    io.emit("messages", messages);
  });
});
// Port
server.listen(port, function () {
  console.log("Example app listening at http://localhost:" + port);
});
