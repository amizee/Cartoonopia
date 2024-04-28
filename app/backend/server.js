const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://kevin:hGDMKGJ0cZVWonkG@cluster0.v5i7fte.mongodb.net/characters');
    const users = new mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        password: String
        
    });

    const Users = mongoose.model('Users', users);
    const out = await Users.find();
    console.log(out);
}