import Book from "../model/books.js";

export const searchBooks = async (req, res) => {
  const {
    query,
    page = 1,
    limit = 8,
    sortBy = "title",
    sortOrder = "asc",
  } = req.query;

  const skip = (page - 1) * limit;
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  try {
    const regex = query ? new RegExp(query, "i") : null;

    let filter = {};
    if (regex) {
      filter.$or = [
        { title: { $regex: regex } },
        { author: { $regex: regex } },
        { category: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }
    
   const books = await Book.find(filter)
      .skip(skip)
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
    // Create a new book
    const newBook = new Book({
      title,
      author,
      publishedYear,
      genre,
      price,
      category,
      description,
    });

    // Save the book to the database
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

