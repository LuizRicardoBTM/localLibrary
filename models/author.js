const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    firstName: {type: String, required: true, maxLength: 100},
    surname: {type: String, required: true, maxLength: 100},
    birthDate: {type: Date},
    deathDate: {type: Date}
});

AuthorSchema.virtual("name").get(function(){
    let fullname = "";
    if (this.firstName && this.surname){
        fullname = `${this.surname}, ${this.firstName}`;
    }

    return fullname;
});

AuthorSchema.virtual("url").get(function(){
    return `author/${this.id}`;
});

AuthorSchema.virtual("birthDate_formatted").get(function(){
    return DateTime.fromJSDate(this.birthDate).toLocaleString(DateTime.DATE_MED);
});

AuthorSchema.virtual("deathDate_formatted").get(function(){
    return DateTime.fromJSDate(this.deathDate).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Author", AuthorSchema);