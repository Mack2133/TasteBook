import { prisma } from "../models/prisma-client";
import { User } from '@prisma/client';

export const fetchAllUsers = async (): Promise<User[]> => {
    return await prisma.user.findMany({
        include: { recipes: true, comments: true},
    });
}

export const fetchUserById = async (id: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: { id },
        include: { recipes: true, comments: true},
    });
}

export const createNewUser = async (name: string, email: string, password: string, imageUrl: string): Promise<User> => {
    try {
        return await prisma.user.create({
            data: {
                name,
                email,
                password,
                imageUrl,
            },
        });
    } catch (error) {
        throw new Error("Error creating user");
    }
}

export const updateUserById = async (id: string, name: string, email: string, password: string): Promise<User> => {

    return await prisma.user.update({
        where: { id },
        data: {
            name,
            email,
            password,
        },
    });
}

export const deleteUserById = async (id: string): Promise<User> => {
    return await prisma.user.delete({
        where: { id },
    });
}


export const checkEmailExist = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
}

export const checkIdExist = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
}