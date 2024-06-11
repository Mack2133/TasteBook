import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, loginUser, registerUser, updateUser } from "../services/userService";
import { authVerify } from "../middlewares/verifyToken";

const userRouter = Router();

userRouter.get('/',authVerify, async (req, res) => {
    await getAllUsers(req, res);
})

userRouter.get('/:id',authVerify, async (req, res) => {
    await getUserById(req, res);
})

userRouter.post('/register', async (req, res) => {
    await registerUser(req, res);
})

userRouter.post('/login', async (req, res) => {
    await loginUser(req, res);
})

userRouter.put('/:id',authVerify, async (req, res) => {
    await updateUser(req, res);
})


userRouter.delete('/:id',authVerify, async (req, res) => {
    await deleteUser(req, res);
})

export default userRouter;