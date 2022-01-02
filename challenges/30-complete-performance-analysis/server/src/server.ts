import * as http from "http";
import {Server} from "socket.io";
import {socketIo} from "./services/socket.io";
import debug from "debug";
import os from "os";
import cluster from "cluster";
import path from "path";

// For the "config" module to correctly detect our configuration folder ("config/")
process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "/config/");
import config from "config";
import {IConfigDefault} from "./config/default";
import {app} from "./app";

const {
  default: {
    app: {port: appPort, startMode, initiator},
  },
} = config as IConfigDefault;

debug("http");

const numCPUs = os.cpus().length;

// Port
const port = normalizePort(appPort);
app.set("port", port);

// Main application
const httpServer: http.Server = http.createServer(app);

if (startMode === "cluster" && initiator !== "pm2" && cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `worker ${worker.process.pid} died, code - ${code}, signal - ${signal}`,
    );
  });
} else {
  // Starting the server
  httpServer.listen(port);
  httpServer.on("error", onError);
  httpServer.on("listening", onListening);

  console.log(`Worker ${process.pid} started`);
}

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
  console.log(`Optional launch parameters (the application already has default values): {

  node server/dist/server.js {PORT - 2} {FACEBOOK_CLIENT_ID - 3} {FACEBOOK_CLIENT_SECRET - 4} {START_MODE (FORK/CLUSTER) - 5} {INITIATOR (FOREVER/PM2) - 6}

  Example: node server/dist/server.js 8080 39402342342 3bsj32n2bs352 
}`);
}

process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});
