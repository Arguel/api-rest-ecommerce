import {Router, Request, Response} from "express";

const router: Router = Router();

// In case the routes are not found
const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 404,
    description: `Route '${req.originalUrl}' - Method '${req.method}' not found`,
  });
};

router.get("/", notFound);
router.post("/", notFound);
router.put("/", notFound);
router.patch("/", notFound);
router.delete("/", notFound);

export default router;
