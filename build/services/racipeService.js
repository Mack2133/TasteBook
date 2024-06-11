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
exports.searchRecipes = exports.deleteRecipe = exports.updateRecipe = exports.createRecipe = exports.getRecipeById = exports.getAllRecipes = void 0;
const prisma_client_1 = require("../models/prisma-client");
const recipeRepository_1 = require("../repositories/recipeRepository");
const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield (0, recipeRepository_1.fetchAllRecipies)();
        res.status(200).json({
            total: recipes.length,
            recipes: recipes
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllRecipes = getAllRecipes;
const getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const recipe = yield prisma_client_1.prisma.recipe.findUnique({
            where: { id },
        });
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getRecipeById = getRecipeById;
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, ingredients, userId } = req.body;
        if (!title || !description || !ingredients || !userId) {
            res.status(400).json({
                message: 'Please provide title, description and ingredients'
            });
        }
        const newRecipe = (0, recipeRepository_1.createNewRecipe)(title, description, ingredients, userId);
        res.status(201).json(newRecipe);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createRecipe = createRecipe;
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, ingredients } = req.body;
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'Please provide id'
            });
        }
        if (!title && !description && !ingredients) {
            res.status(400).json({
                message: 'Please provide title, description or ingredients'
            });
        }
        const recipe = (0, recipeRepository_1.updateRecipeById)(id, title, description, ingredients);
        res.status(200).json(recipe);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.updateRecipe = updateRecipe;
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Please provide id'
            });
        }
        const recipe = (0, recipeRepository_1.deleteRecipeById)(id);
        res.status(200).json(recipe);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteRecipe = deleteRecipe;
const searchRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({
                message: 'Please provide title'
            });
        }
        const recipes = yield prisma_client_1.prisma.recipe.findMany({
            where: {
                title: {
                    contains: title.toString()
                }
            }
        });
        if (recipes.length === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({
            total: recipes.length,
            recipes: recipes
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.searchRecipes = searchRecipes;
