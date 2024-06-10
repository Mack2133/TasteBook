"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commetController_1 = __importDefault(require("../controllers/commetController"));
const recipeController_1 = __importDefault(require("../controllers/recipeController"));
const reviewController_1 = __importDefault(require("../controllers/reviewController"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = (0, express_1.Router)();
router.use('/recipes', recipeController_1.default);
router.use('/users', userController_1.default);
router.use('/ratings', reviewController_1.default);
router.use('/comments', commetController_1.default);
exports.default = router;
