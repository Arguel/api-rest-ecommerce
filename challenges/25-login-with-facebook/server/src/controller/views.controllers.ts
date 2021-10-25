import {Request, Response} from "express";

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
    res.render("login");
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
    res.render("loginError");
  }

  getRegister(req: Request, res: Response): void {
    res.render("register");
  }

  /*
   *postRegister(req: Request, res: Response): void {
   *  res.redirect("/login");
   *}
   */

  getFailRegister(req: Request, res: Response): void {
    res.render("registerError");
  }

  getLogout(req: Request, res: Response): void {
    req.session.destroy((err) => {
      if (err)
        res.status(500).json({
          error: 500,
          description:
            "Unexpected error on the server side. Please try again later",
        });
      else res.render("logout");
    });
  }

  getRoot(req: Request, res: Response): void {
    const {displayName, emails, photos} = req.user as IExpressUser;
    res.render("index", {
      name: displayName,
      email: emails[0].value,
      picture: photos[0].value,
    });
  }
}
