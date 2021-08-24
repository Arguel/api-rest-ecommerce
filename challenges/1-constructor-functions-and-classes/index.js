function Usuario(nombre, apellido, libros, mascotas) {
  this.nombre = nombre; // string
  this.apellido = apellido; // string
  this.libros = libros; // array
  this.mascotas = mascotas; // array

  this.getFullName = function () {
    return `Nombre: ${this.nombre}, Apellido: ${this.apellido}`;
  };
  /* the parameter is a string*/
  this.addMascota = function (mascota) {
    this.mascotas.push(mascota);
  };
  this.getMascotas = function () {
    if (this.mascotas.length > 0) {
      return this.mascotas.length;
    } else {
      return "Lista de mascotas vacia";
    }
  };
  /* the parameters are 2 strings*/
  this.addBook = function (bookName, author) {
    const book = {
      nombre: bookName,
      autor: author,
    };
    this.libros.push(book);
  };
  this.getBooks = function () {
    if (this.libros.length > 0) {
      /* return this.libros.reduce((acc, elem) => ([...acc, elem.nombre]), []);*/
      return this.libros.map((elem) => elem.nombre);
    } else {
      return "Lista de libros vacia";
    }
  };
}

const juan = new Usuario(
  "juan", // nombre
  "torres", // apellido
  [
    {nombre: "El señor de las moscas", autor: "William Golding"},
    {nombre: "Fundacion", autor: "Isaac Asimov"},
  ], // libros
  ["perro", "gato"], // mascotas
);

console.log(juan);
console.log(juan.getMascotas());
console.log(juan.getBooks());
console.log(juan.getFullName());

console.log(
  "---------------------------------------------------------------------------------------------------------------",
);

class UsuarioClass {
  constructor(nombre, apellido, libros, mascotas) {
    this._nombre = nombre; // string
    this._apellido = apellido; // string
    this._libros = libros; // array
    this._mascotas = mascotas; // array
  }

  get getFullName() {
    return `Nombre: ${this._nombre}, Apellido: ${this._apellido}`;
  }
  /* the parameter is a string*/
  addMascota(mascota) {
    this._mascotas.push(mascota);
  }
  get getMascotas() {
    if (this._mascotas.length > 0) {
      return this._mascotas.length;
    } else {
      return "Lista de mascotas vacia";
    }
  }
  /* the parameters are 2 strings*/
  addBook(bookName, author) {
    const book = {
      nombre: bookName,
      autor: author,
    };
    this._libros.push(book);
  }
  get getBooks() {
    if (this._libros.length > 0) {
      /* return this._libros.reduce((acc, elem) => ([...acc, elem.nombre]), []);*/
      return this._libros.map((elem) => elem.nombre);
    } else {
      return "Lista de libros vacia";
    }
  }
}

const pedro = new UsuarioClass(
  "pedro", // nombre
  "peralta", // apellido
  [], // libros
  [], // mascotas
);

console.log(pedro);
pedro.addMascota("perro");
pedro.addBook("One up on wall street", "Peter Lynch");
console.log(pedro.getMascotas);
console.log(pedro.getBooks);
