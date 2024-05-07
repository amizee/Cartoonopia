const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    characters: [String]
});

var Favourite;

if (mongoose.models.Favourite) {
    Favourite = mongoose.model('Favourite')
} else {
    Favourite = mongoose.model('Favourite', favouriteSchema);
}

module.exports = Favourite;