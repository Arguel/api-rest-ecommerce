import {Router, Request, Response, IRouter} from "express";
import {auth} from "../services/auth/auth";
import path from "path";

const router: IRouter = Router();

router.get("/login", (req: Request, res: Response) => {
  res.sendFile("login.html", {root: path.join(".", "src", "views")});
});

router.post("/login/validate", (req: Request, res: Response) => {
  const {username} = req.body;
  if (username) {
    req.session.username = username;
    res.redirect("/");
  } else {
    res.send("Invalid data, please enter a valid name");
  }
});

router.get("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err)
      res.status(500).json({
        error: 500,
        description: `Route '${req.originalUrl}' - Method '${req.method}' not found`,
      });
    else res.sendFile("logout.html", {root: path.join(".", "src", "views")});
  });
});

router.get("/", auth, (req: Request, res: Response) => {
  res.sendFile("index.html", {root: path.join(".", "src")});
});

export default router;
