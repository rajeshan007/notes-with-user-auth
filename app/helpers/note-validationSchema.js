const noteValidationSchema =  {
    title : {
        notEmpty : {
            errorMessage : "title is required"
        }
    }
}   

module.exports =  noteValidationSchema