const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
    user_id: Object,
    characters: [String]
});

var Favourite;

if (mongoose.models.Favourite) {
    Favourite = mongoose.model('Favourite')
} else {
    Favourite = mongoose.model('Favourite', favouriteSchema);
}

module.exports = Favourite;