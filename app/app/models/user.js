const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

var User;

if (mongoose.models.User) {
    User = mongoose.model('User');
} else {
    User = mongoose.model('User', userSchema);
}

module.exports = User;