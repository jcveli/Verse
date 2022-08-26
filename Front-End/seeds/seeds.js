const mongoose = require('mongoose');
const Movie = require('../../Back-End/models/movie')

mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true})
    .then(()=> {
        console.log("CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("CONNECTION FAILED!\NERROR: ");
        console.log(err)
    })


// const morb = new Movie({
//    title: 'Morbius', 
//     score: 10,
//     category:'horror'
// })

// morb.save().then(p => {
//     console.log(p)
// })
//     .catch(err => { 
//         console.log("Error: " + err);
//     })

const movieList = [
    {
        title: 'Morbius', 
        score: 5,
        category:'Horror'
    },

    {
        title: 'Spider-Man', 
        score: 9,
        category:'Action'
    },

    {
       title: 'The Unbearable Weight of Massive Talent', 
        score: 8,
        category:'Comedy'
    },

    {
       title: 'Jurrasic World: Dominion', 
        score: 3,
        category:'Action'
    },

    {
       title: 'Top Gun', 
        score: 8,
        category:'Action'
    },
]
Movie.deleteMany(); 
Movie.insertMany(movieList)
    .then(x => {
        console.log(x)
    })
    .catch(e => { 
        console.log(e)
    })