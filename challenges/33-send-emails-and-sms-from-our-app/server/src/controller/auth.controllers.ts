import {Request, Response} from "express";
import {transporter, mailOptions} from "../services/mailer/ethereal";

export class AuthController {
  getLogin(req: Request, res: Response): void {
    res.status(200).render("login");
  }

  postLogin(req: Request, res: Response): void {
    // const {username, password} = req.body;
    if (req.isAuthenticated()) {
      // req.session.username = username;
      // req.session.password = password;

      mailOptions.subject = "Login";
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(info);
      });

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
    res.redirect("/api/auth/login");
  }

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
}
