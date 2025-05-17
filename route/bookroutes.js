import express from "express";
import { searchBooks, getCategories, deleteBook, updateBookPrice, createBook } from "../controllers/bookcontroller.js";
import { imageUpload } from "../upload/imageUpload.js";

const router = express.Router();

// Route for searching books
router.get("/list", searchBooks);
router.post("/create",imageUpload.single("coverImage"), createBook);
router.get("/categories", getCategories);
router.delete("/deleteBook/:id", deleteBook);
router.put("/updateBook/:id", updateBookPrice);


export default router;