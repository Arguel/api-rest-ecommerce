const express = require('express');
const productsRoute = require('./routes/productsRoute');
const app = express();
const handlebars = require('express-handlebars');
const port = 3000

//Middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Handlebars
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
)

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));

//Routes
app.use('/api', productsRoute);
app.get('', (req, res,) => {
  //res.sendFile('/public/index.hbs', {root: __dirname});
  res.render("index", {
    products: [
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
    ]
  })
})

//Port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
