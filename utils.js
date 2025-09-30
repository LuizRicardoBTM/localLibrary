const error = new Error;

export const genreValidation = (name, min) => {
    
    if(typeof name !== 'string'){
        error = "Not a string";
        return error;
    }

    if(name.length < min){
        error = "Minimal number of characters not achieved";
        return error;
    }

    return name.trim();
};


module.exports = {
    genreValidation,
}