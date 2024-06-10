import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../services/userService";

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    await getAllUsers(req, res);
})

userRouter.get('/:id', async (req, res) => {
    await getUserById(req, res);
})

userRouter.post('/', async (req, res) => {
    await createUser(req, res);
})


userRouter.put('/:id', async (req, res) => {
    await updateUser(req, res);
})


userRouter.delete('/:id', async (req, res) => {
    await deleteUser(req, res);
})

export default userRouter;