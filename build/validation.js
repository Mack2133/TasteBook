"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Validation 
const registerValidation = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().alphanum().min(3).max(12).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
        repeat_password: joi_1.default.ref('password')
    });
    return schema.validate(data);
};
exports.registerValidation = registerValidation;
const loginValidation = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required()
    });
    return schema.validate(data);
};
exports.loginValidation = loginValidation;
