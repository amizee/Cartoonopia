const mongoose = require('mongoose');
const path = require('path');
const express = require('express');

const app = express();

main().catch(err => console.log(err));

async function main() {
    /* Move to Models folder */
    await mongoose.connect('mongodb+srv://kevin:hGDMKGJ0cZVWonkG@cluster0.v5i7fte.mongodb.net/characters');
    const users = new mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        password: String
        
    });

    const Users = mongoose.model('Users', users);
    const out = await Users.find();
    /* ------------------------------------------------------------------ */
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.set('views', path.join(__dirname, '/app/views'));
    app.use(express.static(path.join(__dirname, '/public')));

    /* Move to routes folder */
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });
    app.get('/newchar', function (req, res) {
        res.render('newchar.ejs');
    });
    app.get('/allchar', function (req, res) {
        res.render('allchar.ejs');
    });
    /* ------------------------------------------------------------------- */
    app.listen(3000, function () {
        console.log('app listening on port 3000!');
    });
}