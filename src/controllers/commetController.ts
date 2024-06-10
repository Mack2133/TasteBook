import { Router } from "express";
import { getAllComments, getCommentById, createComment, updateComment, deleteComment } from "../services/commentService";

const commentRouter = Router();

commentRouter.get('/', async (req, res) => {
    await getAllComments(req, res);
})

commentRouter.get('/:id', async (req, res) => {
    await getCommentById(req, res);
})

commentRouter.post('/', async (req, res) => {
    await createComment(req, res);
})


commentRouter.put('/:id', async (req, res) => {
    await updateComment(req, res);
})


commentRouter.delete('/:id', async (req, res) => {
    await deleteComment(req, res);
})

export default commentRouter;