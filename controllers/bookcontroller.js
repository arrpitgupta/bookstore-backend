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
export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error("Error deleting book", error);
    return res.status(500).json({ message: "Error deleting book" });
  }
};

export const updateBookPrice = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({ message: "Invalid price value" });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { price },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book price updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book price", error);
    return res.status(500).json({ message: "Error updating book price" });
  }
};


