const mongoose = require('mongoose');
const Review = require('./reviews');
const Schema = mongoose.Schema; 

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
   
    category: {
        type: String, 
        enum: ['Action', 'Comedy', 'Documentary', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller']
    },
    
    about: {
        type: String,
    },


    director: { 
        type: String,
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }

    ]
})


movieSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Review.deleteMany({
            _id: { 
                $in: doc.reviews 
            }
        })
    }
})

module.exports =  mongoose.model('Movie', movieSchema); 