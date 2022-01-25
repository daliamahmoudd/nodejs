const mongoose = require("mongoose");
const Joi = require("joi");

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    users: [
        // {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "user"
        // }
    ]
});

const joiSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required()
})

const Plan = mongoose.model("plan", planSchema);

const validatePlan = (requestBody) => {
    return joiSchema.validate(requestBody)
}

module.exports = { Plan, validatePlan };
