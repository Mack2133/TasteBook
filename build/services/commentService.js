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
exports.deleteComment = exports.updateComment = exports.createComment = exports.getCommentById = exports.getAllComments = void 0;
const commentRepository_1 = require("../repositories/commentRepository");
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield (0, commentRepository_1.fetchAllComments)();
        res.status(200).json({
            total: comments.length,
            comments: comments
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllComments = getAllComments;
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const comment = yield (0, commentRepository_1.fetchCommentById)(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getCommentById = getCommentById;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, userId } = req.body;
        const { id: recipeId } = req.params;
        if (!content || !userId || !recipeId) {
            return res.status(400).json({ message: 'Please provide content, userId, and recipeId' });
        }
        const newComment = yield (0, commentRepository_1.createNewComment)(content, userId, recipeId);
        res.status(201).json(newComment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createComment = createComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const { id } = req.params;
        if (!id || !content) {
            return res.status(400).json({ message: 'Please provide id and content' });
        }
        const comment = yield (0, commentRepository_1.updateCommentById)(id, content);
        res.status(200).json(comment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Please provide id' });
        }
        const comment = yield (0, commentRepository_1.deleteCommentById)(id);
        res.status(200).json(comment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteComment = deleteComment;
