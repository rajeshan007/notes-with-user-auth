
const User = require('../models/user-model')

const userNameSchema = {
    notEmpty: {
        errorMessage: "userName is required"
    },
    isLength: {
        options: { min: 3 },
        errorMessage: "username should be min 3 characters"
    },
    custom: {
        options: async (value) => {
            const existingUser = await User.findOne({ userName: value })
            if (!existingUser) {
                return true
            } else {
                throw new Error("username is already present")
            }
        }
    }

}
const emailSchema = {
    notEmpty : {
        errorMessage : "email is required"
    }, 
    isEmail : {
        errorMessage : "email is not valid"
    }
}

const registerEmailSchema = {
    notEmpty: {
        errorMessage: "email is required"
    },
    isEmail: {
        errorMessage: "email format is not correct"
    },
    custom: {
        options: async (value) => {
            const existingEmail = await User.findOne({ email: value })
            if (!existingEmail) {
                return true
            } else {
                throw new Error("email is already present")
            }
        }
    }


}

const passwordSchema = {
    notEmpty: {
        errorMessage: "password is required"
    },
    isLength: {
        options: { min: 8, max: 128 },
        errorMessage: "password should be 8 to 128 characters"
    }
}




const userRegistrationSchema = {
    userName: userNameSchema,
    email: registerEmailSchema,
    password: passwordSchema
}



const userLoginSchema = {
    email: emailSchema,
    password: passwordSchema
}

module.exports = {
    userRegistrationSchema,
    userLoginSchema
}   