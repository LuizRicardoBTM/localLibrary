const Author = require("../models/author");
const Book = require("../models/book");

exports.authorList = async (req, res, next) => {
  const authors_list = await Author.find().sort({ surname: 1 }).exec();
  res.render("authorList", {
    title: "Author List",
    authors_list,
  });
};

exports.authorDetail = async (req, res, next) => {

   try {
    const author = await Author.findById(req.params.id).exec();

    if(author === null){
        const err = new Error("Author not found");
        err.status = 404;
        return next(err);
    }
    const  author_books  = await Book.find({ author: id }, "title summary").exec();

    res.render("authorDetail", {
        title: "Author Details",
        author,
        author_books,
    });

   } catch (error) {
    return next(error); 
   }
};

exports.authorCreateGet = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author create get");
};

exports.authorCreatePost = async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Author create post");
};

exports.authorDeleteGet = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete get");
};

exports.authorDeletePost = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete post");
};

exports.authorUpdateGet = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update get");
};

exports.authorUpdatePost = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update post")
};