import {Request, Response} from "express";
import {fork} from "child_process";
import path from "path";
import os from "os";
import {randomNum} from "../libs/helpers/calculations";

interface IEmail {
  value?: string;
  type?: string;
}

interface IPhoto {
  value: string;
}

interface IExpressUser extends Express.User {
  displayName?: string;
  emails?: IEmail[];
  photos?: IPhoto[];
}

export class ViewsController {
  getRoot(req: Request, res: Response): void {
    const {displayName, emails, photos} = req.user as IExpressUser;
    res.status(200).render("index", {
      name: displayName,
      email: emails![0].value,
      picture: photos![0].value,
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
    const startMode = process.argv[5];

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
