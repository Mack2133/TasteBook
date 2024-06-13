import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface UserRequest extends Request {
    user?: any;
}

export const authVerify = (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        Jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
            if (err) return res.status(403).json({ message: 'Invalid Token' });
            req.user = user;
            next();
        })
    } catch (error) {
        
    }
};
