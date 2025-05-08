import express from "express";
import { searchBooks, createBook, getCategories } from "../controllers/bookcontroller.js";

const router = express.Router();

// Route for searching books
router.get("/list", searchBooks);
router.post("/create", createBook);
router.get("/categories", getCategories);


export default router;