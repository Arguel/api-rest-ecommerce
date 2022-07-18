class Usuario {
  constructor(nombre = "", apellido = "", libros = [], mascotas = []) {
    this._nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    this._apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
    this._libros = libros;
    this._mascotas = mascotas;
  }

  getFullName = () => `Fullname: ${this._nombre} ${this._apellido}`;

  addMascota = (mascota) => {
    this._mascotas.push(mascota);
    return;
  };

  countMascotas = () => (this._mascotas.length > 0 ? this._mascotas.length : 0);

  addBook = (bookName, author = "") => {
    this._libros.push({nombre: bookName, autor: author});
    return;
  };

  getBookNames = () =>
    this._libros.length > 0 ? this._libros.map((elem) => elem.nombre) : [];
}

const pedro = new Usuario(
  "pedro", // nombre
  "peralta", // apellido
  [], // libros
  [], // mascotas
);

console.log(pedro.getFullName()); // "Fullname: Pedro Peralta"
console.log(pedro.addMascota("gato")); // undefined
console.log(pedro.countMascotas()); // 1
console.log(pedro.addBook("One up on wall street", "Peter Lynch")); // undefined
console.log(pedro.getBookNames()); // ["One up on wall street"]
console.log(pedro); // Usuario { _nombre: "Pedro", _apellido: "Peralta", _libros: [], _mascotas: [] }
