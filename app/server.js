const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const app = express();

const usersRouter = require("./routes/login");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://kevin:hGDMKGJ0cZVWonkG@cluster0.v5i7fte.mongodb.net/characters');
}

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



app.use("/users", usersRouter);


/* ------------------------------------------------------------------- */
app.listen(3000, function () {
    console.log('app listening on port 3000!');
});