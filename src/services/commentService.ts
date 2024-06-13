import { Request, Response } from "express";
import { 
    fetchAllComments, 
    fetchCommentById, 
    createNewComment, 
    updateCommentById, 
    deleteCommentById 
} from "../repositories/commentRepository";

export const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await fetchAllComments();
        res.status(200).json({ 
            total: comments.length,
            comments: comments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getCommentById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const comment = await fetchCommentById(id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createComment = async (req: Request, res: Response) => {
    try {
        const { content, userId, recipeId } = req.body;
        // const { id: recipeId } = req.params;

        if (!content || !userId || !recipeId) {
            return res.status(400).json({ message: 'Please provide content, and recipeId' });
        }

        const newComment = await createNewComment(content, userId, recipeId);
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        const { id } = req.params;

        if (!id || !content) {
            return res.status(400).json({ message: 'Please provide id and content' });
        }

        const comment = await updateCommentById(id, content);
        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Please provide id' });
        }

        const comment = await deleteCommentById(id);
        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
