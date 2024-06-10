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
const ratingService_1 = require("../services/ratingService");
const ratingRouter = (0, express_1.Router)();
ratingRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ratingService_1.getAllRatings)(req, res);
}));
ratingRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ratingService_1.getRatingById)(req, res);
}));
ratingRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ratingService_1.createRating)(req, res);
}));
ratingRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ratingService_1.updateRating)(req, res);
}));
ratingRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ratingService_1.deleteRating)(req, res);
}));
exports.default = ratingRouter;
