import socketio from 'socket.io';
import http from 'http';
import debug from 'debug';

const log: debug.IDebugger = debug('app:socket-io');

export default class SocketServer {
  private readonly server: http.Server;
  private io: socketio.Server = new socketio.Server();

  constructor(server: http.Server) {
    this.server = server;
    this.configureServer();
    log('Started socket-io service');
  }
  private configureServer(): void {
    this.io.attach(this.server);
    this.io.on('connection', async () => {
      try {
        log('new connection');
      } catch (err) {
        console.log(err);
      }
    });
  }
}
