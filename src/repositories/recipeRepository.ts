import { prisma } from "../models/prisma-client";

export const fetchAllRecipies = async () => {
    return await prisma.recipe.findMany({
        include: { user: true, comments: true},
    });
}

export const fetchRecipeById = async (id: string) => {
    return await prisma.recipe.findUnique({
        where: { id },
        include: { user: true, comments: true},
    });
}

export const createNewRecipe = async (title: string, description: string, ingredients: string[], userId: string, imageUrl: string) => {
    return await prisma.recipe.create({
        data: {
            title,
            description,
            ingredients,
            user: { connect: { id: userId } },
            imageUrl,
        },
    });
}

export const updateRecipeById = async (id: string, title: string, description: string, ingredients: string[], imageUrl: string) => {
    return await prisma.recipe.update({
        where: { id },
            data: {
                title,
                description,
                ingredients,
                imageUrl,
            },
            include: { user: true, comments: true},
    });
}

export const deleteRecipeById = async (id: string) => {
    return await prisma.recipe.delete({
        where: { id },
    });
}
