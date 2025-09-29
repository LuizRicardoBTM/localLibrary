const Genre = require("../models/genre");
const Book = require("../models/book");
const {body, validationResult} = require("express-validator")

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

exports.genreCreateGet = (req, res, next) => {
    res.render("genreForm", {title: "Create Genre"});
};

exports.genreCreatePost = [
  body("name", "Genre name must contain at least 3 letters")
    .trim()
    .isLength({min: 3})
    .escape(),

    async (req, res, next) => {
      const errors = validationResult(req);

      const genre = new Genre({name: req.body.name});

      if(!errors.isEmpty()){
        res.render("genreForm", {
          title: "Create Genre",
          genre,
          errors: errors.array(),
        });

        return;
      }

      const genreExists = await Genre.findOne({name: req.body.name})
        .collation({locale: "en", strength: 2})
        .exec();

      if(genreExists){
        res.redirect(genreExists.url);
        return;
      }

      await genre.save();
      res.redirect(genre.url);
    }
]

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