import express from "express";
import { searchBooks, createBook } from "../controllers/bookcontroller.js";

const router = express.Router();

// Route for searching books
router.get("/list", searchBooks);
router.post("/create", createBook);

export default router;