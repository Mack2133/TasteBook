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
exports.deleteRating = exports.updateRating = exports.createRating = exports.getRatingById = exports.getAllRatings = void 0;
const ratingRepository_1 = require("../repositories/ratingRepository");
const getAllRatings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ratings = yield (0, ratingRepository_1.fetchAllRatings)();
        res.status(200).json({
            total: ratings.length,
            ratings: ratings
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllRatings = getAllRatings;
const getRatingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const rating = yield (0, ratingRepository_1.fetchRatingById)(id);
        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        res.status(200).json(rating);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getRatingById = getRatingById;
const createRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value, userId, recipeId } = req.body;
        if (value === undefined || !userId || !recipeId) {
            return res.status(400).json({ message: 'Please provide value, userId, and recipeId' });
        }
        const newRating = yield (0, ratingRepository_1.createNewRating)(value, userId, recipeId);
        res.status(201).json(newRating);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createRating = createRating;
const updateRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value } = req.body;
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Please provide id' });
        }
        if (value === undefined) {
            return res.status(400).json({ message: 'Please provide value' });
        }
        const rating = yield (0, ratingRepository_1.updateRatingById)(id, value);
        res.status(200).json(rating);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.updateRating = updateRating;
const deleteRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Please provide id' });
        }
        const rating = yield (0, ratingRepository_1.deleteRatingById)(id);
        res.status(200).json(rating);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteRating = deleteRating;
