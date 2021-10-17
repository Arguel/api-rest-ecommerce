import {Request, Response} from "express";
import path from "path";

export class ViewsController {
  getLogin(req: Request, res: Response): void {
    res.sendFile("login.html", {root: path.join(".", "dist", "views")});
  }

  postLogin(req: Request, res: Response): void {
    const {username, password} = req.body;
    if (username && password) {
      req.session.username = username;
      req.session.password = password;
      res.redirect("/");
    } else {
      res.send("Invalid data, please enter a valid name");
    }
  }

  getFailLogin(req: Request, res: Response): void {
    res.sendFile("loginError.html", {root: path.join(".", "dist", "views")});
  }

  getRegister(req: Request, res: Response): void {
    res.sendFile("register.html", {root: path.join(".", "dist", "views")});
  }

  postRegister(req: Request, res: Response): void {
    res.redirect("/login");
  }

  getFailRegister(req: Request, res: Response): void {
    res.sendFile("registerError.html", {root: path.join(".", "dist", "views")});
  }

  getLogout(req: Request, res: Response): void {
    req.session.destroy((err) => {
      if (err)
        res.status(500).json({
          error: 500,
          description:
            "Unexpected error on the server side. Please try again later",
        });
      else res.sendFile("logout.html", {root: path.join(".", "dist", "views")});
    });
  }

  getRoot(req: Request, res: Response): void {
    res.sendFile("index.html", {root: path.join(".", "dist")});
  }
}
