import {Request, Response} from "express";
import {etherealMailer} from "../services/mailer/ethereal";
import {IExpressUser} from "../libs/interfaces/app.interfaces";

export class AuthController {
  getLogin(req: Request, res: Response): void {
    res.status(200).render("login");
  }

  postLogin(req: Request, res: Response): void {
    if (req.isAuthenticated()) {
      etherealMailer.mailOptions.subject = `log in ${
        (req.user as IExpressUser).displayName
      } - date: ${new Date().toString()}`;

      etherealMailer.transporter.sendMail(
        etherealMailer.mailOptions,
        (err, info) => {
          if (err) {
            console.log(err);
            return err;
          }
          console.log(info);
        },
      );

      res.redirect("/api/");
    } else {
      res.send("Invalid data, please enter a valid name");
    }
  }

  getFailLogin(req: Request, res: Response): void {
    res.status(200).render("loginError");
  }

  getRegister(req: Request, res: Response): void {
    res.status(200).render("register");
  }

  postRegister(req: Request, res: Response): void {
    // res.redirect("/api/auth/login");
    res.redirect("/api/");
  }

  getFailRegister(req: Request, res: Response): void {
    res.status(200).render("registerError");
  }

  getLogout(req: Request, res: Response): void {
    etherealMailer.mailOptions.subject = `log out ${
      (req.user as IExpressUser).displayName
    } - date: ${new Date().toString()}`;

    etherealMailer.transporter.sendMail(
      etherealMailer.mailOptions,
      (err, info) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(info);
      },
    );

    const {displayName} = req.user as IExpressUser;
    req.session.destroy((err) => {
      if (err)
        res.status(500).json({
          error: 500,
          description:
            "Unexpected error on the server side. Please try again later",
        });
      else res.status(200).render("logout", {displayName});
    });
  }
}
