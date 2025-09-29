const mongoose = require("mongoose");
const { DateTime } = require("luxon");

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
    return `/catalog/author/${this.id}`;
});

AuthorSchema.virtual("lifespan").get(function(){
    const birthDate_formatted = DateTime.fromJSDate(this.birthDate).toLocaleString(DateTime.DATE_MED);
    const deathDate_formatted = DateTime.fromJSDate(this.deathDate).toLocaleString(DateTime.DATE_MED);

    if(this.birthDate){
        if(this.deathDate){
            return `${birthDate_formatted} - ${deathDate_formatted}`;
        }
        return `${birthDate_formatted} - Still alive`;
    }
        return "No lifespan information";
});

module.exports = mongoose.model("Author", AuthorSchema);