import { Router } from "express";
import { createRecipe, deleteRecipe, getAllRecipes, getRecipeById, searchRecipes, updateRecipe } from "../services/racipeService";

const recipeRouter = Router();

recipeRouter.get('/', async (req, res) => {
    await getAllRecipes(req, res);
})

recipeRouter.get('/search', async (req, res) => {
    await searchRecipes(req, res);
});

recipeRouter.get('/:id', async (req, res) => {
    await getRecipeById(req, res);
})

recipeRouter.post('/', async (req, res) => {
    await createRecipe(req, res);
})


recipeRouter.put('/:id', async (req, res) => {
    await updateRecipe(req, res);
})


recipeRouter.delete('/:id', async (req, res) => {
    await deleteRecipe(req, res);
})

export default recipeRouter;