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
const express_1 = require("express");
const prisma_client_1 = require("../models/prisma-client");
const recipeRouter = (0, express_1.Router)();
recipeRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield prisma_client_1.prisma.recipe.findMany();
        res.status(200).json(recipes);
    }
    catch (error) {
        console.log(error);
    }
}));
recipeRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const recipe = yield prisma_client_1.prisma.recipe.findUnique({
            where: {
                id: (id)
            }
        });
        res.status(200).json(recipe);
    }
    catch (error) {
        console.log(error);
    }
}));
recipeRouter.post('/', (req, res) => {
    try {
        const { title, description, ingredients, userId } = req.body;
        if (!title || !description || !ingredients || !userId) {
            res.status(400).json({
                message: 'Please provide title, description and ingredients'
            });
        }
        const newRecipe = prisma_client_1.prisma.recipe.create({
            data: {
                title,
                description,
                ingredients,
                user: { connect: { id: userId } }
            }
        });
        res.status(201).json(newRecipe);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
recipeRouter.put('/:id', (req, res) => {
    try {
        const { id, title, description, ingredients } = req.body;
        res.send(`Hello from recipe controller with id: ${req.params.id}`);
    }
    catch (error) {
        console.log(error);
    }
});
recipeRouter.delete('/:id', (req, res) => {
    try {
        res.send(`Hello from recipe controller with id: ${req.params.id}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = recipeRouter;
