import { Schema, model } from 'mongoose';

interface Recipe {
  name: string;
  ingredients: string[];
  instruction: string[];
  addedAt: Date;
}

const schema = new Schema<Recipe>({
  name: {
    type: String,
    required: [true, 'A Recipe must have a name'],
    unique: true,
    trim: true,
  },
  ingredients: {
    type: [String],
    required: [true, 'A Recipe must have ingredients'],
  },
  instruction: {
    type: [String],
    required: [true, 'A Recipe must have instruction'],
  },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
});

const RecipeModel = model('Recipe', schema);

export default RecipeModel;
