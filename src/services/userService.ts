import { Request, Response } from "express";
import { prisma } from "../models/prisma-client";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ 
            total: users.length,
            users: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            res.status(400).json({
                message: 'Please provide title, description and ingredients'
            })
        }

        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body;
        const { id } = req.params;
        if(!id){
            res.status(400).json({
                message: 'Please provide id'
            })
        }
        if(!name || !email || !password){
            res.status(400).json({
                message: 'Please provide title, description or ingredients'
            })
        }

        const user = await prisma.user.update({
            where: { id },
            data: {
                name: name,
                email: email,
                password: password,
            },
        });

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Please provide id'
            })
        }

        const user = await prisma.user.delete({
            where: { id },
        });

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}