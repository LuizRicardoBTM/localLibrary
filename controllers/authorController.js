const { error } = require("node:console");
const Author = require("../models/author");
const Book = require("../models/book");
const {body, validationResult} = require("express-validator");

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
    const  author_books  = await Book.find({ author: req.params.id }, "title summary").exec();

    res.render("authorDetail", {
        title: "Author Details",
        author,
        author_books,
    });

   } catch (error) {
    return next(error); 
   }
};

exports.authorCreateGet = (req, res, next) => {
    res.render("authorForm", {title: "Create Author"})
};

exports.authorCreatePost = [

    body("firstName")
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage("Name must be specified.")
        .isAlphanumeric()
        .withMessage("Name has non-alphanumeric characters."),

    body("surname")
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage("Surname must be specified.")
        .isAlphanumeric()
        .withMessage("Surname has non-alphanumeric characters."),

    body("birthDate", "Invalid date of birth")
        .optional({values: "falsy"})
        .isISO8601()
        .toDate(),

    body("deathDate", "Invalid date of death")
        .optional({values: "falsy"})
        .isISO8601()
        .toDate(),


    async (req, res, next) =>{
       
        const payload = req.body;
        const errors = validationResult(req);

        const author = new Author({
            firstName: payload.firstName,
            surname: payload.surname,
            birthDate: payload.birthDate,
            deathDate: payload.deathDate,
        })

        if(!errors.isEmpty()){
            res.render("authorForm", {
                title: "Create Author",
                author,
                errors: errors.array(),
            });
            return;
        }

        function deathAfterBirth (birth, death){
            if(payload.birthDate && payload.deathDate && payload.birthDate >= payload.deathDate){
                return true;
            }

            return false;

        }

        if(deathAfterBirth){
            const dateError = {msg:"The date of death cant be before or equal to date of birth"};
           
            res.render("authorForm", {
               title: "Create Author",
                author,
                dateError,
            });
            return; 
        }
        await author.save();
        res.redirect(author.url);
    }
];

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