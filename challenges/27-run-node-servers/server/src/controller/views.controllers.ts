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
  getLogin(req: Request, res: Response): void {
    res.status(200).render("login");
  }

  /*
   *postLogin(req: Request, res: Response): void {
   *  const {username, password} = req.body;
   *  if (username && password) {
   *    req.session.username = username;
   *    req.session.password = password;
   *    res.redirect("/");
   *  } else {
   *    res.send("Invalid data, please enter a valid name");
   *  }
   *}
   */

  getFailLogin(req: Request, res: Response): void {
    res.status(200).render("loginError");
  }

  getRegister(req: Request, res: Response): void {
    res.status(200).render("register");
  }

  /*
   *postRegister(req: Request, res: Response): void {
   *  res.redirect("/login");
   *}
   */

  getFailRegister(req: Request, res: Response): void {
    res.status(200).render("registerError");
  }

  getLogout(req: Request, res: Response): void {
    req.session.destroy((err) => {
      if (err)
        res.status(500).json({
          error: 500,
          description:
            "Unexpected error on the server side. Please try again later",
        });
      else res.status(200).render("logout");
    });
  }

  getRoot(req: Request, res: Response): void {
    const {displayName, emails, photos} = req.user as IExpressUser;
    res.status(200).render("index", {
      name: displayName,
      email: emails[0].value,
      picture: photos[0].value,
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
