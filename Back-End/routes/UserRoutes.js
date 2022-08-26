const express = require('express');
const catchAsync = require('../../Front-End/utils/catchAsync');
const router = express.Router();
const passport = require('passport')
const User = require('../models/user');



router.post('/register', catchAsync(async(req, res, next) => {
    try{
        const {username, email, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err)
                return next(err); 
            req.flash('success', 'Account created!');
            res.redirect('/movie');       
        })
    } catch(e){
        req.flash('error', e.message);
        res.redirect('/')
    }
}));


router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect:'/'}), (req,res) => {
    const redirectUrl = req.session.returnTo || '/movie';
    delete req.session.returnTo; 
    res.redirect(redirectUrl);
})


router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if(err){
            return next(err)
        }
        req.flash('success', 'Goodbye, see you later!');
        res.redirect('/');
    }); 
})

module.exports = router; 