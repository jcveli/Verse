const express = require('express')
const router = express.Router({ mergeParams: true})
const Movies = require('../models/movie');
const Review = require('../models/reviews');

const {movieSchema, reviewSchema} = require('../Schemas');

const catchAsync = require('../../Front-End/utils/catchAsync');
const ExpressError = require('../../Front-End/utils/ExpressError');


const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400); 
    }else {
        next();
    }
}


router.post('/', catchAsync(async (req, res, next) => {
    const movie = await Movies.findById(req.params.id);
    const review = new Review(req.body.review);
    movie.reviews.push(review);
    await review.save();
    await movie.save();
    req.flash('success', 'Review posted!');
    res.redirect(`/movie/${movie._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req, res, next) => {
    const {id, reviewId} = req.params; 
    await Movies.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/movie/${id}`)
}))

module.exports = router; 