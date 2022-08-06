import {Request, Response} from "express";
import {etherealTsp, etherealMailOpt} from "../services/mailer/ethereal";
import {gmailTsp, gmailMailOpt} from "../services/mailer/gmail";
import {IExpressUser} from "../libs/interfaces/app.interfaces";

export class AuthController {
  genSubject(msg: string, req: Request): string {
    return `${
      msg + " " + (req.user as IExpressUser).displayName
    } account was detected in ${new Date().toString()}`;
  }

  getLogin(req: Request, res: Response): void {
    res.status(200).render("login");
  }

  postLogin = async (req: Request, res: Response): Promise<void> => {
    if (req.isAuthenticated())
      try {
        etherealMailOpt.subject = this.genSubject("A new login of the", req);
        await etherealTsp.sendMail(etherealMailOpt);

        gmailMailOpt.subject = this.genSubject("A new login of the", req);
        if ((req.user as IExpressUser).facebook) {
          const picture: string = (req.user as IExpressUser).facebook._json
            .picture.data.url;
          if (picture) gmailMailOpt.subject = picture;
        }

        await gmailTsp.sendMail(gmailMailOpt);

        res.redirect("/");
      } catch (err) {
        console.log(err);
      }
    else res.send("Invalid information check that the data entered is correct");
  };

  getFailLogin(req: Request, res: Response): void {
    res.status(200).render("loginError");
  }

  getRegister(req: Request, res: Response): void {
    res.status(200).render("register");
  }

  getFailRegister(req: Request, res: Response): void {
    res.status(200).render("registerError");
  }

  getLogout = async (req: Request, res: Response): Promise<void> => {
    try {
      etherealMailOpt.subject = this.genSubject("Log out of", req);
      await etherealTsp.sendMail(etherealMailOpt);
    } catch (err) {
      console.log(err);
    }

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
  };
}
