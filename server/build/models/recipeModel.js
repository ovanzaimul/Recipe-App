"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
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
const RecipeModel = (0, mongoose_1.model)('Recipe', schema);
exports.default = RecipeModel;
