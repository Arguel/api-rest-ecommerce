function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const http = require("http");

http
  .createServer((request, response) => {
    const item = {
      id: randomInteger(1, 10),
      title: `Producto ${randomInteger(1, 10)}`,
      price: randomNumber(0.0, 9999).toFixed(2),
      thumbnail: `Foto ${randomInteger(1, 10)}`,
    };

    response.end(JSON.stringify(item));
  })
  .listen(3001, function () {
    console.log(
      `Servidor escuchando en http://localhost:${this.address().port}`,
    );
  });
