const Author = require("../models/author");
const Book = require("../models/book");

exports.author_list = async (req, res, next) => {
  const allAuthors = await Author.find().sort({ surname: 1 }).exec();
  res.render("author_list", {
    title: "Author List",
    author_list: allAuthors,
  });
};

async function findAuthorAndHisBooks(id) {
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(id).exec(),
    Book.find({ author: id }, "title summary").exec(),
  ]);

  return [author, allBooksByAuthor];
}

exports.author_detail = async (req, res, next) => {

    const [author, allBooksByAuthor] = await findAuthorAndHisBooks(req.params.id);

    if(author === null){
        const err = new Error("Author not found");
        err.status = 404;
        return next(err);
    }

    res.render("author_detail", {
        title: "Author Details",
        author,
        author_books: allBooksByAuthor,
    })
};

exports.author_create_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author create get");
};

exports.author_create_post = async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Author create post");
};

exports.author_delete_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete get");
};

exports.author_delete_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete post");
};

exports.author_update_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update get");
};

exports.author_update_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author update post")
};