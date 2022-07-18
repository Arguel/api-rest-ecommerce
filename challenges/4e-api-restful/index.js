const express = require("express");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Routes
app.use("/api/products", routes);
app.get("", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

// Port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
