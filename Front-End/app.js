const express = require('express');
const app = express(); 
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');

const Movie = require('../Back-End/routes/MovieRoute');
//const User = require('../Back-End/models/user');
const Review = require('../Back-End/routes/ReviewRoutes');

const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');
const localStrategy = require('passport-local');


const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');



//connects to the mongoDB database 
mongoose.connect('mongodb://localhost:27017/movieApp',{
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(()=> {
        console.log("CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("CONNECTION FAILED!\NERROR: ");
        console.log(err)
    })

    

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessionConfig))

//Flash setup and decleration
app.use(flash())

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



//routes
app.use('/movie', Movie)
app.use('/movie/:id/review', Review)






//main page where the user will be logged in 
app.get('/', catchAsync(async (req, res, next) => {
    res.render('login')
}))



app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})



app.use((err, req, res, next) => { 
    const {status = 500} = err;
    if(!err.message)
        err.message = "Something Went Wrong..."
    res.status(status).render('error', {err});
})




app.listen(3000, () => { 
    console.log("App is running on port 3000...")
})

