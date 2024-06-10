import { Request, Response } from "express";
import { prisma } from "../models/prisma-client";

export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        const recipes = await prisma.recipe.findMany();
        res.status(200).json({ 
            total: recipes.length,
            recipes: recipes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getRecipeById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const recipe = await prisma.recipe.findUnique({
            where: { id },
        });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createRecipe = async (req: Request, res: Response) => {
    try {
        const {title, description, ingredients, userId} = req.body;
        if(!title || !description || !ingredients || !userId){
            res.status(400).json({
                message: 'Please provide title, description and ingredients'
            })
        }

        const newRecipe = await prisma.recipe.create({
            data: {
                title,
                description,
                ingredients,
                user: { connect: { id: userId } },
            },
        });
        res.status(201).json(newRecipe);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateRecipe = async (req: Request, res: Response) => {
    try {
        const {title, description, ingredients} = req.body;
        const { id } = req.params;
        if(!id){
            res.status(400).json({
                message: 'Please provide id'
            })
        }
        if(!title && !description && !ingredients){
            res.status(400).json({
                message: 'Please provide title, description or ingredients'
            })
        }

        const recipe = await prisma.recipe.update({
            where: { id },
            data: {
                title,
                description,
                ingredients,
            },
        });

        res.status(200).json(recipe);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteRecipe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Please provide id'
            })
        }

        const recipe = await prisma.recipe.delete({
            where: { id },
        });

        res.status(200).json(recipe);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}