const Genre = require("../models/genre");
const Book = require("../models/book");

exports.genreList = async (req, res, next) => {
    const genres_list = await Genre.find().sort({ name: 1 }).exec();

    res.render("genreList", {
      title: "Genre List",
      genres_list,
    });
};

exports.genreDetail = async (req, res, next) => {

  const [genre, books_in_genre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);

  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genreDetail", {
    title: "Genre Detail",
    genre,
    books_in_genre,
  });
};

exports.genreCreateGet = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre create get");
};

exports.genreCreatePost = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre create post");
};

exports.genreDeleteGet = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre delete get");
};

exports.genreDeletePost = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre delete post");
};

exports.genreUpdateGet = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre update get");
};

exports.genreUpdatePost = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre update post");
};