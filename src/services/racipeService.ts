import { Request, Response } from "express";
import { prisma } from "../models/prisma-client";
import { createNewRecipe, deleteRecipeById, fetchAllRecipies, updateRecipeById } from "../repositories/recipeRepository";

export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        const recipes = await fetchAllRecipies();
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

        const newRecipe = createNewRecipe(title, description, ingredients, userId)
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

        const recipe = updateRecipeById(id, title, description, ingredients);

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

        const recipe = deleteRecipeById(id);

        res.status(200).json(recipe);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}