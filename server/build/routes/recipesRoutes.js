"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipesController_1 = require("../controllers/recipesController");
const router = express_1.default.Router();
router.route('/').get(recipesController_1.getAllRecipes).post(recipesController_1.createRecipe);
router.route('/:id').patch(recipesController_1.updateRecipe).delete(recipesController_1.deleteRecipe);
router.route('/:id_or_name').get(recipesController_1.getRecipe);
exports.default = router;
