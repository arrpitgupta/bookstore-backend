// models/Book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true 
    },
    imageUrl: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;