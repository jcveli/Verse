const express = require('express');
const app = express(); 
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const User = require('../Back-End/models/user')

const movieRoutes = require('../Back-End/routes/MovieRoute');
const userRoutes = require('../Back-End/routes/UserRoutes');
const reviewRoutes = require('../Back-End/routes/ReviewRoutes');

const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');
const localStrategy = require('passport-local');


const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');



//connects to the mongoDB database 
mongoose.connect('mongodb://localhost:27017/movieApp',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
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
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //millisecond/second/minute/hours/week
        maxAge: 1000 * 60 * 60 * 24 * 7 //1 week maximum
    }
}

//flash and session use-setup
app.use(session(sessionConfig));
app.use(flash());

//login passport initialization
app.use(passport.initialize()); 
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

//functions for serialize and deseralize; how to log in and out a user out of the system
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user; 
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



//routes
app.use('/movie', movieRoutes)
app.use('/movie/:id/review', reviewRoutes)
app.use('/', userRoutes);





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

