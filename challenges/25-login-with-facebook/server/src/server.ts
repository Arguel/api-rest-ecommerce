import {app} from "./app";
import * as http from "http";
import {Server} from "socket.io";
import {socketIo} from "./services/socket.io";
import debug from "debug";

debug("http");

// Port
const port = normalizePort(process.env.PORT || "8080");
app.set("port", port);

// Main application
const httpServer: http.Server = http.createServer(app);

// Starting the server
httpServer.listen(port);
httpServer.on("error", onError);
httpServer.on("listening", onListening);

// Websockets
const io: Server = new Server(httpServer, {
  /* options */
});

// Io socket connection
socketIo(io);

function normalizePort(val: string) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;

  if (port >= 0) return port;

  return false;
}

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = httpServer.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr!.port;
  debug("Listening on " + bind);
  console.log(`Example app listening at http://localhost:${port}`);
}
