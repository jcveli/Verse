const Joi = require('joi'); 
const {number} = require('joi');

module.exports.movieSchema = Joi.object({
    movie: Joi.object ({
        title: Joi.string().required(),
        category: Joi.string().required(),
        about: Joi.string().required(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object ({
        rating:Joi.number().required().min(1).max(10),
        body: Joi.string().required()
    }).required()
})