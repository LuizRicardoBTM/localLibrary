const BookInstance = require("../models/bookinstance");

exports.bookInstanceList = async (req, res, next) => {
  const bookinstance_list = await BookInstance.find().populate("book").exec();

  res.render("bookinstanceList", {
    title: "Book Instance List",
    bookinstance_list,
  });
};

exports.bookInstanceDetail = async (req, res, next) =>{
    try{
    const book_instance = await BookInstance
    .findById(req.params.id)
    .populate("book")
    .exec();
    } catch (error) {
    return next(error); 
   }

    if(book_instance === null){
        const err = new Error("Book copy not found");
        err.status = 404;
        return next(err);
    }

    res.render("bookinstanceDetail", {
        title: "Book: ",
        book_instance,
    })
};

exports.bookInstanceCreateGet = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance create get");
};

exports.bookInstanceCreatePost = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance create post");
};

exports.bookInstanceDeleteGet = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance delete get");
};

exports.bookInstanceDeletePost = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance delete post");
};

exports.bookInstanceUpdateGet = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance update get");
};

exports.bookInstanceUpdatePost = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance update post");
};