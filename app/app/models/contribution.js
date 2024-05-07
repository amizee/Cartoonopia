const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
    contribution_id: String,
    user_id: Object,
    action: String,
    status: String,
    reviewed_by: Object,
    date: Date,
    data: {
        id: String,
        active: Boolean,
        name: String,
        subtitle: String,
        description: String,
        image_url: String,
        strength: Number,
        speed: Number,
        skill: Number,
        fear_factor: Number,
        power: Number,
        intelligence: Number,
        wealth: Number
    }
});

var Contribution;

if (mongoose.models.Contribution) {
    Contribution = mongoose.model('Contribution');
} else {
    Contribution = mongoose.model('Contribution', contributionSchema);
}

module.exports = Contribution;