import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface UserRequest extends Request {
    user?: any;
}

export const authVerify = (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = Jwt.verify(token, process.env.TOKEN_SECRET as string);
        req.user = verified;
        next(); // Call next() to proceed to the next middleware
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
