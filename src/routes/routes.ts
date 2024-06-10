import { Router } from "express";
import commentRouter from "../controllers/commetController";
import recipeRouter from "../controllers/recipeController";
import ratingRouter from "../controllers/reviewController";
import userRouter from "../controllers/userController";

const router = Router();

router.use('/recipes', recipeRouter);
router.use('/users', userRouter);
router.use('/ratings', ratingRouter);
router.use('/comments', commentRouter);

export default router;
