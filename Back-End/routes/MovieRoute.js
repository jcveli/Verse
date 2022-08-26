const express = require('express');
const router = express.Router();

const {movieSchema} = require('../Schemas.js')

const catchAsync = require('../../Front-End/utils/catchAsync');
const ExpressError = require('../../Front-End/utils/ExpressError');
const { isLoggedIn } = require("../../Front-End/middleware");
const Movie = require('../models/movie');

const validateMovie = (req, res, next) => { 
    const {error} = movieSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
}

router.get('/', catchAsync( async (req, res) => {
    const movies = await Movie.find({})
    //console.log(movies)
    res.render('home', {movies})
}))

router.get('/addMovie', isLoggedIn, catchAsync( async (req, res) => {
    res.render('movies/addNew');
}))

router.post('/', validateMovie, catchAsync(async(req, res, next) => {
    const movie = new Movie(req.body.movie);
    await movie.save();
    req.flash('success', 'Successfully created a new movie');
    res.redirect(`/movie`);
}));


router.get('/:id',catchAsync(async (req, res, next) => { 
    const { id } = req.params; 
    const result = await Movie.findById(id).populate('reviews');
    if(!result){
        throw new ExpressError('Movie not Found', 404);
    }
    res.render('movies/details', {result}); 
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res, next) => { 
    const { id } = req.params; 
    const result = await Movie.findById(id);
    if(!result){
        req.flash('error', "Cannot find movie...");
        return res.redirect('/movie')
    }
    res.render('movies/editMovie', {result}); 
}));

router.put('/:id', validateMovie, catchAsync(async (req, res) => {
    const { id }  = req.params
    const movie = await Movie.findByIdAndUpdate(id, { ...req.body.movie}); 
    req.flash('success', 'Successfully updated movie...' );
    res.redirect(`/movie/${movie._id}`);
}));

router.delete('/:id', catchAsync(async(req, res) => {
    const {id} = req.params;
    await Movie.findByIdAndDelete(id);
    req.flash('success', "successfully deleted the movie...");
    res.redirect('/movie');
}));


module.exports = router;