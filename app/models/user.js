const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

var User;

if (mongoose.models.User) {
    User = mongoose.model('User');
} else {
    User = mongoose.model('User', UsersSchema);
}

module.exports = User;