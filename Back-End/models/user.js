const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    userName: {
        type:String,
        required:[true, 'Need a Username to identify']
    },

    email: {
        type: String,
        required:true,
        unique: [true,'Email is already being used.']
    },

    password: { 
        type: String,
        required: [true, 'Password Required']
    }
})

userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model('User', userSchema);