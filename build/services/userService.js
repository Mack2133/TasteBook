"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = exports.getUserById = exports.getAllUsers = void 0;
const userRepository_1 = require("../repositories/userRepository");
const validation_1 = require("../validation");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userRepository_1.fetchAllUsers)();
        res.status(200).json({
            total: users.length,
            users: users
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield (0, userRepository_1.fetchUserById)(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getUserById = getUserById;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, repeat_password } = req.body;
        const { error } = (0, validation_1.registerValidation)(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        if (yield (0, userRepository_1.checkEmailExist)(email)) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = yield (0, userRepository_1.createNewUser)(name, email, hashedPassword);
        res.status(201).json({
            status: 'User created successfully',
            user_id: newUser.id,
            name: newUser.name,
            email: newUser.email
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, validation_1.loginValidation)(req.body);
    const { email, password } = req.body;
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    // Check if email exist
    const user = yield (0, userRepository_1.checkEmailExist)(email);
    if (!user)
        return res.status(400).json({ message: 'Email or password is wrong' });
    // Check if password is correct
    const validPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!validPassword)
        return res.status(400).json({ message: 'Email or password is wrong' });
    const token = jsonwebtoken_1.default.sign({ _id: user.id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({ token });
    res.status(200).json({ message: 'Login successful' });
});
exports.loginUser = loginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield (0, userRepository_1.updateUserById)(id, name, email, password);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Please provide id'
            });
        }
        const user = yield (0, userRepository_1.deleteUserById)(id);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteUser = deleteUser;
