"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authVerify = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json({ message: 'Access Denied' });
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next(); // Call next() to proceed to the next middleware
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
exports.authVerify = authVerify;
