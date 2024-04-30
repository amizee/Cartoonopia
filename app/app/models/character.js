const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
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
});

var Character;
if (mongoose.models.Character) {
    Character = mongoose.model('Character');
} else {
    Character = mongoose.model('Character', characterSchema)
}

/* characterSchema.statics.getAll = async function() {
    try {
        console.log("triggered!")
        const all = await this.findAll();
        console.log("all characters: ", all);
        return all;
    } catch (e) {
        console.error('Error obtaining characters: ', error);
        return null;
    }
};
 */
module.exports = Character;