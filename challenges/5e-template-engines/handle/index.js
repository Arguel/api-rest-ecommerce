const express = require("express");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 8080;
const { engine } = require("express-handlebars");

// Middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Handlebars
// app.engine(
//   "hbs",
//   handlebars({
//     extname: ".hbs",
//     defaultLayout: "main.hbs",
//     layoutsDir: __dirname + "/views/layouts",
//     partialsDir: __dirname + "/views/partials",
//   })
// );
app.engine("handlebars", engine());

// Engines
app.set("view engine", "handlebars");
app.set("views", "./views");

// Static files
app.use(express.static("public"));

// Routes
app.use("/api/products", routes);

// Port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/api/products`);
});
