const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

exports.index = async (req, res, next) => {
  
  try{
  const [
    number_of_books,
    number_of_book_instances,
    number_of_available_book_instances,
    number_of_authors,
    number_of_genres,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status: "Available" }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);
  } catch (error) {
    return next(error); 
   }

  res.render("index", {
    title: "Local Library Home",
    number_of_books,
    number_of_book_instances,
    number_of_available_book_instances,
    number_of_authors,
    number_of_genres,
  });
};

exports.bookList = async (req, res, next) => {
  const books_list = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  res.render("bookList", { 
    title: "Book List", 
    books_list,
  });
};

exports.bookDetail = async (req, res, next) => {

  const [book, book_instances] = await Promise.all([
    Book.findById(req.params.id).populate("author").populate("genre").exec(),
    BookInstance.find({book: req.params.id}).exec(),
  ]);
  
  if(book === null){
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("bookDetail", {
    title: book.title,
    book,
    book_instances,
  })
};

exports.bookCreateGet = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book create get");
};

exports.bookCreatePost = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book create post");
};

exports.bookDeleteGet = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete get");
};

exports.bookDeletePost = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete post");
};

exports.bookUpdateGet = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book update get");
};

exports.bookUpdatePost = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book update post");
};