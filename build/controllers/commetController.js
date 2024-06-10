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
const commentService_1 = require("../services/commentService");
const commentRouter = (0, express_1.Router)();
commentRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, commentService_1.getAllComments)(req, res);
}));
commentRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, commentService_1.getCommentById)(req, res);
}));
commentRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, commentService_1.createComment)(req, res);
}));
commentRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, commentService_1.updateComment)(req, res);
}));
commentRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, commentService_1.deleteComment)(req, res);
}));
exports.default = commentRouter;
