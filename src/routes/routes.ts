import { Router } from "express";
import commentRouter from "../controllers/commetController";
import recipeRouter from "../controllers/recipeController";
import ratingRouter from "../controllers/reviewController";
import userRouter from "../controllers/userController";
import { authVerify } from "../middlewares/verifyToken";


const router = Router();

router.use('/ratings',authVerify,ratingRouter);
router.use('/comments',authVerify,commentRouter);
router.use('/recipes',authVerify,recipeRouter);
router.use('/search',authVerify,recipeRouter);
router.use('/users',userRouter);

export default router;
