const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique: true
    }
});


//this will add in a username and password to the schema
userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model('User', userSchema);