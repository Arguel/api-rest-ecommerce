import {Request, Response} from "express";
import {fork} from "child_process";
import path from "path";
import os from "os";
import {randomNum} from "../libs/helpers/calculations";
import {IExpressUser} from "../libs/interfaces/app.interfaces";
import config from "config";
import {IConfigDefault} from "../config/default";

const {
  default: {
    app: {startMode},
  },
} = config as IConfigDefault;

export class ViewsController {
  getRoot(req: Request, res: Response): void {
    console.log(req.user);
    const {displayName, emails, photos} = req.user as IExpressUser;
    console.log(req.user);
    res.status(200).render("index", {
      name: displayName ? displayName : "undefined",
      email: emails && emails.length >= 1 ? emails[0].value : "undefined",
      picture: photos && photos.length >= 1 ? photos[0].value : "undefined",
    });
  }

  getInfo(req: Request, res: Response): void {
    res.status(200).json({
      Input_arguments: process.argv,
      Platform_name: process.platform,
      Node_js_version: process.version,
      Memory_usage: process.memoryUsage(),
      Execution_path: process.execPath,
      Process_id: process.pid,
      Current_folder: process.cwd(),
      NumCPUs: os.cpus().length,
      asd: 4,
    });
  }

  getRandoms(req: Request, res: Response): void {
    const defaultNumber = 100000000;
    const {qty} = req.query;

    if (startMode === "cluster") {
      const totalNumbers = randomNum(qty as string);
      res.status(200).json({totalNumbers});
    } else {
      const forked = fork(
        path.join("server", "dist", "libs", "helpers", "calculate.js"),
      );
      if (qty) forked.send(qty as string);
      else forked.send(defaultNumber);

      forked.on("message", (result) => {
        res.status(200).json({result});
      });
    }
  }
}
