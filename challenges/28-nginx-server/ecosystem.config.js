module.exports = {
  apps: [
    {
      name: "are-cluster", // api-rest-ecommerce
      script: "./server/dist/server.js",
      exec_mode: "cluster",
      watch: true,
      ignore_watch: "node_modules",
      max_restarts: 10,
      autorestart: true,
      intances: "max",
      args: "--port 8081 --facebookClientId null --facebookClientSecret null --startMode cluster --initiator pm2",
    },
    {
      name: "are-fork", // api-rest-ecommerce
      script: "./server/dist/server.js",
      watch: true,
      ignore_watch: "node_modules",
      max_restarts: 10,
      autorestart: true,
      args: "8080 null null fork null",
    },
  ],
};
