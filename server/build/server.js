"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose_1.default
    .connect(DB, {
    dbName: process.env.DB_NAME,
})
    .then(() => console.log('Database connected'));
app_1.default.listen(port, () => {
    console.log(`app running on port ${port}`);
});
