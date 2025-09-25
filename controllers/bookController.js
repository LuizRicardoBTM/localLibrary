const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

exports.index = async (req, res, next) => {
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status: "Available" }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Local Library Home",
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances,
    author_count: numAuthors,
    genre_count: numGenres,
  });
};

exports.book_list = async (req, res, next) => {
  const allBooks = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  res.render("book_list", { title: "Book List", book_list: allBooks });
};

exports.book_detail = async (req, res, next) => {

  const [book, bookInstance] = await Promise.all([
    Book.findById(req.params.id).populate("author").populate("genre").exec(),
    BookInstance.find({book: req.params.id}).exec(),
  ]);
  
  if(book === null){
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("book_detail", {
    title: book.title,
    book,
    book_instances: bookInstance,
  })
};

exports.book_create_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book create get");
};

exports.book_create_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book create post");
};

exports.book_delete_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete get");
};

exports.book_delete_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete post");
};

exports.book_update_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book update get");
};

exports.book_update_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book update post");
};