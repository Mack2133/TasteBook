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
const racipeService_1 = require("../services/racipeService");
const recipeRouter = (0, express_1.Router)();
recipeRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, racipeService_1.getAllRecipes)(req, res);
}));
recipeRouter.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, racipeService_1.searchRecipes)(req, res);
}));
recipeRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, racipeService_1.getRecipeById)(req, res);
}));
recipeRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, racipeService_1.createRecipe)(req, res);
}));
recipeRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, racipeService_1.updateRecipe)(req, res);
}));
recipeRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, racipeService_1.deleteRecipe)(req, res);
}));
exports.default = recipeRouter;
