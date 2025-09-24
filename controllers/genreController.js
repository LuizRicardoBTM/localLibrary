const Genre = require("../models/genre");
const Book = require("../models/book");

exports.genre_list = async (req, res, next) => {
    const allGenres = await Genre.find().sort({ name: 1 }).exec();
      res.render("genre_list", {
        title: "Genre List",
        genre_list: allGenres,
      });
};

exports.genre_details = async (req, res, next) => {
    
    const [genre, booksInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({genre: req.params.id}, "Title Sumarry").exec(),
    ]);

    if(genre === null){
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
    }

    res.render("genre_detail", {
        title: "Genre detail",
        genre,
        genre_books: booksInGenre,
    })
};

exports.genre_create_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre create get");
};

exports.genre_create_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre create post");
};

exports.genre_delete_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre delete get");
};

exports.genre_delete_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre delete post");
};

exports.genre_update_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre update get");
};

exports.genre_update_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre update post");
};