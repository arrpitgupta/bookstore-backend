import express from "express";
import { searchBooks, createBook, getCategories, deleteBook, updateBookPrice } from "../controllers/bookcontroller.js";

const router = express.Router();

// Route for searching books
router.get("/list", searchBooks);
router.post("/create", createBook);
router.get("/categories", getCategories);
router.delete("/deleteBook/:id", deleteBook);
router.put("/updateBook/:id", updateBookPrice);


export default router;