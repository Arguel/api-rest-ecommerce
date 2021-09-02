const express = require("express");
const app = express();
const port = 3000;

let products = [
  {
    "title": "water",
    "price": "$200",
    "thumbnail": "./img/water.png",
    "id": 0,
  },
  {
    "title": "orange",
    "price": "$10",
    "thumbnail": "./img/orange.png",
    "id": 1,
  },
  {
    "title": "milk",
    "price": "$90",
    "thumbnail": "./img/milk.png",
    "id": 2,
  },
];

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/api/products/list", (req, res) => {
  if (products.length)
    res.json(products);
   else
    res.json({
      "error": "No products loaded",
    });
});

app.get("/api/products/list/:id", (req, res) => {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1)
    res.json(products[productId]);
   else
    res.send("Product not found");
});

app.post("/api/products/save", (req, res) => {
  const data = req.body;
  products = [...products, {...data, "id": products.length}];
  res.json(products);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
