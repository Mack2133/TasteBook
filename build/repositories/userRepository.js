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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIdExist = exports.checkEmailExist = exports.deleteUserById = exports.updateUserById = exports.createNewUser = exports.fetchUserById = exports.fetchAllUsers = void 0;
const prisma_client_1 = require("../models/prisma-client");
const fetchAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.user.findMany();
});
exports.fetchAllUsers = fetchAllUsers;
const fetchUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.user.findUnique({
        where: { id },
    });
});
exports.fetchUserById = fetchUserById;
const createNewUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_client_1.prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
    }
    catch (error) {
        throw new Error("Error creating user");
    }
});
exports.createNewUser = createNewUser;
const updateUserById = (id, name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.user.update({
        where: { id },
        data: {
            name,
            email,
            password,
        },
    });
});
exports.updateUserById = updateUserById;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.user.delete({
        where: { id },
    });
});
exports.deleteUserById = deleteUserById;
const checkEmailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_client_1.prisma.user.findUnique({ where: { email } });
    return user;
});
exports.checkEmailExist = checkEmailExist;
const checkIdExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_client_1.prisma.user.findUnique({ where: { id } });
    return user;
});
exports.checkIdExist = checkIdExist;
