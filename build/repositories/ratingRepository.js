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
exports.deleteRatingById = exports.updateRatingById = exports.createNewRating = exports.fetchRatingById = exports.fetchAllRatings = void 0;
const prisma_client_1 = require("../models/prisma-client");
const fetchAllRatings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.rating.findMany();
});
exports.fetchAllRatings = fetchAllRatings;
const fetchRatingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.rating.findUnique({
        where: { id },
    });
});
exports.fetchRatingById = fetchRatingById;
const createNewRating = (value, userId, recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.rating.create({
        data: {
            value: value,
            recipe: { connect: { id: recipeId } },
            user: { connect: { id: userId } },
        },
    });
});
exports.createNewRating = createNewRating;
const updateRatingById = (id, value) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.rating.update({
        where: { id },
        data: {
            value,
        },
    });
});
exports.updateRatingById = updateRatingById;
const deleteRatingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.rating.delete({
        where: { id },
    });
});
exports.deleteRatingById = deleteRatingById;
