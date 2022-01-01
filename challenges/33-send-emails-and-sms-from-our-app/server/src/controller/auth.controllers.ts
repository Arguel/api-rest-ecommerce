import {Request, Response} from "express";
import {etherealTsp, etherealMailOpt} from "../services/mailer/ethereal";
import {gmailTsp, gmailMailOpt} from "../services/mailer/gmail";
import {IExpressUser} from "../libs/interfaces/app.interfaces";

export class AuthController {
  genSubject(msg: string, req: Request): string {
    return `${
      msg + (req.user as IExpressUser).displayName
    } - date: ${new Date().toString()}`;
  }

  getLogin(req: Request, res: Response): void {
    res.status(200).render("login");
  }

  async postLogin(req: Request, res: Response): Promise<void> {
    if (req.isAuthenticated())
      try {
        etherealMailOpt.subject = this.genSubject("log in", req);
        await etherealTsp.sendMail(etherealMailOpt);

        gmailMailOpt.subject = this.genSubject("log in", req);
        await gmailTsp.sendMail(gmailMailOpt);

        res.redirect("/api/");
      } catch (err) {
        console.log(err);
      }
    else res.send("Invalid data, please enter a valid name");
  }

  getFailLogin(req: Request, res: Response): void {
    res.status(200).render("loginError");
  }

  getRegister(req: Request, res: Response): void {
    res.status(200).render("register");
  }

  getFailRegister(req: Request, res: Response): void {
    res.status(200).render("registerError");
  }

  async getLogout(req: Request, res: Response): Promise<void> {
    etherealMailOpt.subject = this.genSubject("log out", req);
    await etherealTsp.sendMail(etherealMailOpt);

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
