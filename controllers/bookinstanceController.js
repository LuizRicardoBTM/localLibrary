const BookInstance = require("../models/bookinstance");

exports.bookinstance_list = async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate("book").exec();

  res.render("bookinstance_list", {
    title: "Book Instance List",
    bookinstance_list: allBookInstances,
  });
};

exports.bookinstance_detail = async (req, res, next) =>{
    try{
    const bookInstance = await BookInstance
    .findById(req.params.id)
    .populate("book")
    .exec();
    } catch (error) {
    return next(error); 
   }

    if(bookInstance === null){
        const err = new Error("Book copy not found");
        err.status = 404;
        return next(err);
    }

    res.render("bookinstance_detail", {
        title: "Book: ",
        bookinstance: bookInstance,
    })
};

exports.bookinstance_create_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance create get");
};

exports.bookinstance_create_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance create post");
};

exports.bookinstance_delete_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance delete get");
};

exports.bookinstance_delete_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance delete post");
};

exports.bookinstance_update_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance update get");
};

exports.bookinstance_update_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance update post");
};