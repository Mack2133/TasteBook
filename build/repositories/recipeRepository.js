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
exports.deleteRecipeById = exports.updateRecipeById = exports.createNewRecipe = exports.fetchRecipeById = exports.fetchAllRecipies = void 0;
const prisma_client_1 = require("../models/prisma-client");
const fetchAllRecipies = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.recipe.findMany();
});
exports.fetchAllRecipies = fetchAllRecipies;
const fetchRecipeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.recipe.findUnique({
        where: { id },
    });
});
exports.fetchRecipeById = fetchRecipeById;
const createNewRecipe = (title, description, ingredients, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.recipe.create({
        data: {
            title,
            description,
            ingredients,
            user: { connect: { id: userId } },
        },
    });
});
exports.createNewRecipe = createNewRecipe;
const updateRecipeById = (id, title, description, ingredients) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.recipe.update({
        where: { id },
        data: {
            title,
            description,
            ingredients,
        },
    });
});
exports.updateRecipeById = updateRecipeById;
const deleteRecipeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.recipe.delete({
        where: { id },
    });
});
exports.deleteRecipeById = deleteRecipeById;
