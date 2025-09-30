var error = new Error;

export const genreValidation = (genre, min) => {
    
    if(typeof genre !== 'string'){
        error = "Not a string";
        return error;
    }

    if(genre.length < min){
        error = "Minimal number of characters not achieved";
        return error;
    }

    return genre.trim();
};