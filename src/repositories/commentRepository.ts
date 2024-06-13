import { prisma } from "../models/prisma-client";

export const fetchAllComments = async () => {
    return await prisma.comment.findMany({
        
    });
}

export const fetchCommentById = async (id: string) => {
    return await prisma.comment.findUnique({
        where: { id },
        include: { user: true, recipe: true },
    });
}

export const createNewComment = async (content: string, userId: string, recipeId: string) => {
    return await prisma.comment.create({
        data: {
            content,
            user: { connect: { id: userId } },
            recipe: { connect: { id: recipeId } },
        },
    });
}

export const updateCommentById = async (id: string, content: string) => {
    return await prisma.comment.update({
        where: { id },
        data: { content },
        include: { user: true, recipe: true },
    });
}

export const deleteCommentById = async (id: string) => {
    return await prisma.comment.delete({
        where: { id },
    });
}
