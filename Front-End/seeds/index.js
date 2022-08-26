
const mongoose = require('mongoose');
const Movie = require('../../Back-End/models/movie');


//connects to the mongoDB database 
mongoose.connect('mongodb://localhost:27017/movieApp',{
    useNewUrlParser: true
})
    .then(()=> {
        console.log("CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("CONNECTION FAILED!\NERROR: ");
        console.log(err)
    })


// const seedDB = async () => {
//     await Movie.deleteMany({});
//     const m = new Movie({name: 'The Room'});
//     await m.save(); 

// }

// seedDB(); 