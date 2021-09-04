"use strict";

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  let n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    iter["@@iterator"] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];

  return arr2;
}

function ownKeys(object, enumerableOnly) {
  const keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    let symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });

    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (let i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2)
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
     else if (Object.getOwnPropertyDescriptors)
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
     else
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj)
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
   else
    obj[key] = value;

  return obj;
}

const express = require("express");

const app = express();

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer);

const port = 3000;

const fs = require("fs");

const handlebars = require("express-handlebars"); // Products json

const productsData = fs.readFileSync(__dirname + "/products.json", "utf-8");
let products = JSON.parse(productsData.toString("utf-8")); // Messages json

const messagesData = fs.readFileSync(__dirname + "/userMessages.json", "utf-8");
const messages = JSON.parse(messagesData.toString("utf-8")); // Middlewares

app.use(express.text());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
); // Handlebars

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  }),
); // Engines

app.set("view engine", "hbs");
app.set("views", __dirname + "/views"); // Static files

app.use(express["static"](__dirname + "/public")); // Routes

app.get("/", function (req, res) {
  res.render("index", {
    products: products,
    messages: messages,
  });
});
app.get("/api/products", function (req, res) {
  if (products.length > 1)
    res.render("index", {
      products: products,
    });
  else res.send("There are no products.");
});
app.get("/api/products/list/:id", function (req, res) {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1)
    res.render("products", {
      products: [products[productId]],
    });
  else res.send("Product not found");
});
app.post("/api/products", function (req, res) {
  const data = req.body;

  const newProduct = _objectSpread(
    _objectSpread({}, data),
    {},
    {
      id: products.length,
    },
  );

  products = [].concat(_toConsumableArray(products), [newProduct]);
  res.render("products", {
    products: products,
  });
  io.emit("newProduct", newProduct);
});
app.put("/api/products/update/:id", function (req, res) {
  const productId = req.params.id;

  if (productId >= 0 && productId <= products.length - 1) {
    products[productId] = _objectSpread(
      _objectSpread({}, req.body),
      {},
      {
        id: productId,
      },
    );
    res.render("products", {
      products: [products[productId]],
    });
  } else {
    res.send("Product not found");
  }
});
app["delete"]("/api/products/delete/:id", function (req, res) {
  const productId = req.params.id;

  if (productId >= 0 && productId <= products.length - 1) {
    const deletedItem = products.splice(productId, 1);
    res.render("products", {
      products: [deletedItem[0]],
    });
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
}); // Port

httpServer.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});

