import { Request, Response } from 'express';
import Recipe from './../models/recipeModel';
import mongoose from 'mongoose';

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    let recipes = [];
    const searchQuery = req.query.search;
    if (searchQuery) {
      recipes = await Recipe.find({
        name: new RegExp(String(searchQuery), 'i'),
      });
    } else {
      recipes = await Recipe.find();
    }
    res.status(200).json({
      message: 'success',
      length: recipes.length,
      recipes,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const { name, ingredients, instruction } = req.body;
    const recipe = await Recipe.create({ name, ingredients, instruction });

    res.status(201).json({
      message: 'success',
      recipe,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRecipe = async (req: Request, res: Response) => {
  try {
    const id_or_name = req.params.id_or_name;
    let recipe = null;
    if (mongoose.Types.ObjectId.isValid(id_or_name)) {
      recipe = await Recipe.findById(id_or_name);
    } else {
      recipe = await Recipe.findOne({ name: id_or_name });
    }
    res.status(200).json({
      message: 'success',
      recipe,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      message: 'success',
      recipe,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Recipe.findByIdAndDelete(id);
    res.status(204).json({
      message: 'success',
      recipe: null,
    });
  } catch (err) {
    console.log(err);
  }
};
