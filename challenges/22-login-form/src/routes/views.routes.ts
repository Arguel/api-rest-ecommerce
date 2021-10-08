import {Router, Request, Response, IRouter} from "express";
import path from "path";

const router: IRouter = Router();

router.get("/login", (req: Request, res: Response) => {
  res.sendFile("login.html", {root: path.join(".", "src", "views")});
});
router.post("/login/validate", (req: Request, res: Response) => {
  const {username} = req.body;
  if (username) req.session.user.name = username;
});

router.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html", {root: path.join(".", "src")});
});

export default router;
