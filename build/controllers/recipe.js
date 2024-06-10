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
recipeRouter.get('/:id', (req, res) => {
    try {
        res.send(`Hello from recipe controller with id: ${req.params.id}`);
    }
    catch (error) {
        console.log(error);
    }
});
recipeRouter.post('/', (req, res) => {
    try {
        res.send('Hello from recipe controller');
    }
    catch (error) {
        console.log(error);
    }
});
recipeRouter.put('/:id', (req, res) => {
    try {
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
