const express = require("express");
const routes = require("./routes");
const app = express();
const port = 3000;

// Middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use("/api", routes);
app.get("", (req, res) => {
  res.sendFile("./index.html", {root: __dirname});
});

// Port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
