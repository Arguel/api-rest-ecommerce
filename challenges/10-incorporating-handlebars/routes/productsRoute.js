const express = require('express');
const router = express.Router();

let products = [
  {
    "title": "calculator",
    "price": 123.45,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png",
    "id": 0
  },
  {
    "title": "squad",
    "price": 234.56,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png",
    "id": 1
  },
  {
    "title": "clock",
    "price": 345,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png",
    "id": 2
  }
];

router.get('/products', (req, res,) => {
  if (products.length) {
    res.json(products);
  } else {
    res.json({
      "error": "No products loaded"
    })
  }
});

router.get('/products/list/:id', (req, res,) => {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1) {
    res.json(products[productId]);
  } else {
    res.send('Product not found');
  }
});

router.post('/products', (req, res,) => {
  const data = req.body;
  products = [...products, {...data, "id": products.length}];
  res.json(products);
});

router.put('/products/update/:id', (req, res,) => {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1) {
    products[productId] = {...req.body, "id": productId};
    res.json(products[productId]);
  } else {
    res.send('Product not found');
  }
});

router.delete('/products/delete/:id', (req, res,) => {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1) {
    const deletedItem = products.splice(productId, 1);
    res.json(deletedItem[0]);
  } else {
    res.send('Product not found');
  }
});

module.exports = router;
