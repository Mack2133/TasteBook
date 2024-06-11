import { Router } from "express";
import commentRouter from "../controllers/commetController";
import recipeRouter from "../controllers/recipeController";
import ratingRouter from "../controllers/reviewController";
import userRouter from "../controllers/userController";

const router = Router();

router.use('/ratings',ratingRouter);
router.use('/comments',commentRouter);
router.use('/recipies',recipeRouter);
router.use('/search',recipeRouter);
router.use('/users',userRouter);

export default router;
