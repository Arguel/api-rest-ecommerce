import {Router, Request, Response, IRouter} from "express";
import {auth} from "../services/auth/auth";
import path from "path";

const router: IRouter = Router();

router.get("/login", (req: Request, res: Response) => {
  res.sendFile("login.html", {root: path.join(".", "dist", "views")});
});

router.post("/login", (req: Request, res: Response) => {
  const {username} = req.body;
  if (username) {
    req.session.username = username;
    res.redirect("/");
  } else {
    res.send("Invalid data, please enter a valid name");
  }
});

router.get("/faillogin", (req: Request, res: Response) => {
  res.sendFile("loginError.html", {root: path.join(".", "dist", "views")});
});

router.get("/register", (req: Request, res: Response) => {
  res.sendFile("register.html", {root: path.join(".", "dist", "views")});
});

router.get("/failregister", (req: Request, res: Response) => {
  res.sendFile("registerError.html", {root: path.join(".", "dist", "views")});
});

router.get("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err)
      res.status(500).json({
        error: 500,
        description:
          "Unexpected error on the server side. Please try again later",
      });
    else res.sendFile("logout.html", {root: path.join(".", "dist", "views")});
  });
});

router.get("/", auth, (req: Request, res: Response) => {
  res.sendFile("index.html", {root: path.join(".", "dist")});
});

export default router;
