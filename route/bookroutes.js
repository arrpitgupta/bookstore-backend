import express from "express";
import { searchBooks, createBook, getCategories, deleteBook } from "../controllers/bookcontroller.js";

const router = express.Router();

// Route for searching books
router.get("/list", searchBooks);
router.post("/create", createBook);
router.get("/categories", getCategories);
router.delete("/books/:id", deleteBook);


export default router;