const Genre = require("../models/genre");

exports.genre_list = async (req, res, next) => {
    const allGenres = await Genre.find().sort({ name: 1 }).exec();
      res.render("genre_list", {
        title: "Genre List",
        genre_list: allGenres,
      });
};

exports.genre_details = async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
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