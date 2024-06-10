import { prisma } from "../models/prisma-client";

export const fetchAllRatings = async () => {
    return await prisma.rating.findMany();
}

export const fetchRatingById = async (id: string) => {
    return await prisma.rating.findUnique({
        where: { id },
    });
}

export const createNewRating = async (value: number, userId: string, recipeId: string) => {
    return await prisma.rating.create({
        data: {
            value: value,
            recipe: { connect: { id: recipeId } },
            user: { connect: { id: userId } },
        },
    });
}

export const updateRatingById = async (id: string, value: number) => {
    return await prisma.rating.update({
        where: { id },
        data: {
            value,
        },
    });
}

export const deleteRatingById = async (id: string) => {
    return await prisma.rating.delete({
        where: { id },
    });
}
