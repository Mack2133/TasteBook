import { Router } from "express";
import { createRating, deleteRating, getAllRatings, getRatingById, updateRating } from "../services/ratingService";

const ratingRouter = Router();

ratingRouter.get('/', async (req, res) => {
    await getAllRatings(req, res);
})

ratingRouter.get('/:id', async (req, res) => {
    await getRatingById(req, res);
})

ratingRouter.post('/', async (req, res) => {
    await createRating(req, res);
})


ratingRouter.put('/:id', async (req, res) => {
    await updateRating(req, res);
})


ratingRouter.delete('/:id', async (req, res) => {
    await deleteRating(req, res);
})

export default ratingRouter;