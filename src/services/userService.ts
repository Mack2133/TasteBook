import { Request, Response } from "express";
import {
    fetchAllUsers,
    fetchUserById,
    createNewUser,
    updateUserById,
    deleteUserById,
    checkEmailExist,
} from "../repositories/userRepository";
import { loginValidation, registerValidation } from "../validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await fetchAllUsers();
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
        const user = await fetchUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, imageUrl } = req.body;

        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        if (await checkEmailExist(email)) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await createNewUser(name, email, hashedPassword, imageUrl);
        res.status(201).json({
            status: 'User created successfully',
            user_id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            imageUrl: newUser.imageUrl,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const loginUser = async (req: Request, res: Response) => {

    const { error } = loginValidation(req.body);
    const { email, password } = req.body;    

    if (error) return res.status(400).json({ message: error.details[0].message }) 

    const user = await checkEmailExist(email);
    if(!user) return res.status(400).json({ message: 'Email or password is wrong' })

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).json({ message: 'Email or password is wrong' })

    const token = jwt.sign({user}, process.env.TOKEN_SECRET as string, {expiresIn: '1h'});
    res.json({accessToken: token})
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Please provide id'
            });
        }
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please provide name, email, and password'
            });
        }

        const user = await updateUserById(id, name, email, password);
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
            });
        }

        const user = await deleteUserById(id);
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
