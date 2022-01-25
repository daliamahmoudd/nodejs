const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model("User", new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 120,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}))

const validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(120).required(),
        isAdmin: Joi.boolean()
    })
    return schema.validate(user)
}

module.exports = { User, validateUser }