import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import Recipe from './../models/recipeModel';

export const getAllRecipes = catchAsync(async (req: Request, res: Response) => {
  let recipes = [];
  const searchQuery = req.query.search;
  if (searchQuery) {
    recipes = await Recipe.find({
      name: new RegExp(String(searchQuery), 'i'),
    }).select('-_id -__v');
  } else {
    recipes = await Recipe.find();
  }
  res.status(200).json({
    message: 'success',
    length: recipes.length,
    recipes,
  });
});

export const createRecipe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, ingredients, instruction } = req.body;
    const recipe = await Recipe.create({
      name,
      ingredients,
      instruction,
    });

    if (!recipe) {
      return next(new AppError(`cannot create recipe`, 404));
    }

    res.status(201).json({
      message: 'success',
      recipe,
    });
  },
);

export const getRecipe = catchAsync(async (req: Request, res: Response) => {
  const id_or_name = req.params.id_or_name;
  let recipe = null;
  if (mongoose.Types.ObjectId.isValid(id_or_name)) {
    recipe = await Recipe.findById(id_or_name).select('-_id -__v');
  } else {
    recipe = await Recipe.findOne({ name: id_or_name }).select('-_id -__v');
  }

  res.status(200).json({
    message: 'success',
    recipe,
  });
});

export const updateRecipe = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).select('-_id -__v');
  res.status(200).json({
    message: 'success',
    recipe,
  });
});

export const deleteRecipe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return next(new AppError(`This ID: ${id} is invalid or not found`, 404));
    }
    res.status(204).json({
      message: 'success',
      recipe: null,
    });
  },
);
