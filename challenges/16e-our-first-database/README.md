# Importante:

1. Es necesario tener una base de datos con nombre "ecommerce" en MariaDB/MySQL
2. Instalar las dependencias con `npm install`

## Comandos para el servidor:

- Correr el server:

  ```sh
  npm start
  ```

- Para hacer la build:

  ```sh
  npm run build
  ```

- Para migrar la base de datos ("ecommerce" mencionada arriba):

  ```sh
  npm run migrate:db
  ```

- Para hacer rollback a la base de datos ("ecommerce" mencionada arriba):

  ```sh
  npm run migrate:db
  ```

- Para poblar la base de datos ("ecommerce" mencionada arriba):

  ```sh
  npm run seed:db
  ```
