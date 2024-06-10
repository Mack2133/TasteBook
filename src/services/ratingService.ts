import { Request, Response } from "express";
import { prisma } from "../models/prisma-client";

export const getAllRatings = async (req: Request, res: Response) => {
    try {
        const ratings = await prisma.rating.findMany();
        res.status(200).json({ 
            total: ratings.length,
            ratings: ratings
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getRatingById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const rating = await prisma.rating.findUnique({
            where: { id },
        });

        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        res.status(200).json(rating);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createRating = async (req: Request, res: Response) => {
    try {
        const {value, userId} = req.body;
        if(!value || !userId){
            res.status(400).json({
                message: 'Please a value, userId'
            })
        }

        const newRating = await prisma.rating.create({
            data: {
                value: value,
                recipe: { connect: { id: userId } },
                user: { connect: { id: userId } },
            },
        });
        res.status(201).json(newRating);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateRating = async (req: Request, res: Response) => {
    try {
        const {value, userId} = req.body;
        const { id } = req.params;
        if(!id){
            res.status(400).json({
                message: 'Please provide id'
            })
        }
        if(!value && !userId){
            res.status(400).json({
                message: 'Please provide value or userId'
            })
        }

        const rating = await prisma.rating.update({
            where: { id },
            data: {
                value: value
            },
        });

        res.status(200).json(rating);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteRating = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Please provide id'
            })
        }

        const rating = await prisma.rating.delete({
            where: { id },
        });

        res.status(200).json(rating);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}