import express from 'express';

import {
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  // findRecipe,
} from '../controllers/recipesController';

const router = express.Router();

router.route('/').get(getAllRecipes).post(createRecipe);

router.route('/:id').patch(updateRecipe).delete(deleteRecipe);
router.route('/:id_or_name').get(getRecipe);
export default router;
