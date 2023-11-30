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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipe = exports.updateRecipe = exports.getRecipe = exports.createRecipe = exports.getAllRecipes = void 0;
const recipeModel_1 = __importDefault(require("./../models/recipeModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let recipes = [];
        const searchQuery = req.query.search;
        if (searchQuery) {
            recipes = yield recipeModel_1.default.find({
                name: new RegExp(String(searchQuery), 'i'),
            });
        }
        else {
            recipes = yield recipeModel_1.default.find();
        }
        res.status(200).json({
            message: 'success',
            length: recipes.length,
            recipes,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAllRecipes = getAllRecipes;
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, ingredients, instruction } = req.body;
        const recipe = yield recipeModel_1.default.create({ name, ingredients, instruction });
        res.status(201).json({
            message: 'success',
            recipe,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createRecipe = createRecipe;
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_or_name = req.params.id_or_name;
        let recipe = null;
        if (mongoose_1.default.Types.ObjectId.isValid(id_or_name)) {
            recipe = yield recipeModel_1.default.findById(id_or_name);
        }
        else {
            recipe = yield recipeModel_1.default.findOne({ name: id_or_name });
        }
        res.status(200).json({
            message: 'success',
            recipe,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRecipe = getRecipe;
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const recipe = yield recipeModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            message: 'success',
            recipe,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateRecipe = updateRecipe;
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield recipeModel_1.default.findByIdAndDelete(id);
        res.status(204).json({
            message: 'success',
            recipe: null,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteRecipe = deleteRecipe;
