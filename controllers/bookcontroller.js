// controllers/bookController.js
import Book from "../model/books.js";

export const searchBooks = async (req, res) => {
  const {
    query,
    page = 1,
    limit = 10,
    sortBy = "title",
    sortOrder = "asc",
    category,
    minPrice,
    maxPrice,
  } = req.query;

  const skip = (page - 1) * limit;
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  try {
    let filter = {};

    if (query) {
      const regex = new RegExp(query, "i");
      filter.$or = [
        { title: { $regex: regex } },
        { author: { $regex: regex } },
        { category: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const books = await Book.find(filter)
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ [sortBy]: sortDirection });

    const totalBooks = await Book.countDocuments(filter);

    return res.status(200).json({
      books,
      totalBooks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBooks / limit),
      pageSize: Number(limit),
    });
  } catch (error) {
    console.error("Error fetching books", error);
    return res.status(500).json({ message: "Error fetching books" });
  }
};

export const createBook = async (req, res) => {
  const { title, author, publishedYear, genre, price, category, description } =
    req.body;

  if (!title || !author || !publishedYear || !genre || !price || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newBook = new Book({
      title,
      author,
      publishedYear,
      genre,
      price,
      category,
      description,
    });

    await newBook.save();

    return res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book", error);
    return res.status(500).json({ message: "Error creating book" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Book.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};
