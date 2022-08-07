import { httpServer } from "./services/server";
import config from "./config";
import { ioService } from "./services/socket";
import { mysql_service } from "./services/Mysql";
import { sqLite_service } from "./services/sqlite3";

httpServer.listen(config.server_port, () => {
  console.log(`Server running on port:${config.server_port}`);
  ioService.init(httpServer);
  mysql_service.init();
  sqLite_service.init();
});
