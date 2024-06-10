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
exports.deleteCommentById = exports.updateCommentById = exports.createNewComment = exports.fetchCommentById = exports.fetchAllComments = void 0;
const prisma_client_1 = require("../models/prisma-client");
const fetchAllComments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.comment.findMany();
});
exports.fetchAllComments = fetchAllComments;
const fetchCommentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.comment.findUnique({
        where: { id },
    });
});
exports.fetchCommentById = fetchCommentById;
const createNewComment = (content, userId, recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.comment.create({
        data: {
            content,
            user: { connect: { id: userId } },
            recipe: { connect: { id: recipeId } },
        },
    });
});
exports.createNewComment = createNewComment;
const updateCommentById = (id, content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.comment.update({
        where: { id },
        data: { content },
    });
});
exports.updateCommentById = updateCommentById;
const deleteCommentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.prisma.comment.delete({
        where: { id },
    });
});
exports.deleteCommentById = deleteCommentById;
