import { Request, Response } from "express";
import { 
    fetchAllRatings, 
    fetchRatingById, 
    createNewRating, 
    updateRatingById, 
    deleteRatingById 
} from "../repositories/ratingRepository";

export const getAllRatings = async (req: Request, res: Response) => {
    try {
        const ratings = await fetchAllRatings();
        res.status(200).json({ 
            total: ratings.length,
            ratings: ratings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getRatingById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const rating = await fetchRatingById(id);

        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        res.status(200).json(rating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createRating = async (req: Request, res: Response) => {
    try {
        const { value, userId, recipeId, imageUrl } = req.body;

        if (value === undefined || !userId || !recipeId) {
            return res.status(400).json({ message: 'Please provide value, userId, and recipeId' });
        }

        const newRating = await createNewRating(value, userId, recipeId);
        res.status(201).json(newRating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateRating = async (req: Request, res: Response) => {
    try {
        const { value } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Please provide id' });
        }
        if (value === undefined) {
            return res.status(400).json({ message: 'Please provide value' });
        }

        const rating = await updateRatingById(id, value);
        res.status(200).json(rating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteRating = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Please provide id' });
        }

        const rating = await deleteRatingById(id);
        res.status(200).json(rating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
