import { prisma } from "../models/prisma-client";

export const fetchAllRecipies = async () => {
    return await prisma.recipe.findMany();
}

export const fetchRecipeById = async (id: string) => {
    return await prisma.recipe.findUnique({
        where: { id },
    });
}

export const createNewRecipe = async (title: string, description: string, ingredients: string[], userId: string) => {
    return await prisma.recipe.create({
        data: {
            title,
            description,
            ingredients,
            user: { connect: { id: userId } },
        },
    });
}

export const updateRecipeById = async (id: string, title: string, description: string, ingredients: string[]) => {
    return await prisma.recipe.update({
        where: { id },
            data: {
                title,
                description,
                ingredients,
            },
    });
}

export const deleteRecipeById = async (id: string) => {
    return await prisma.recipe.delete({
        where: { id },
    });
}
