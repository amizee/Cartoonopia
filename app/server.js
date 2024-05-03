const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const app = express();

const usersRouter = require("./app/routes/server_routes");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://kevin:hGDMKGJ0cZVWonkG@cluster0.v5i7fte.mongodb.net/characters');
}

/* ------------------------------------------------------------------ */
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/app/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', usersRouter);


/* ------------------------------------------------------------------ */
app.listen(3001, function () {
    console.log('backend app listening on port 3001 at http://localhost:3001');
});
module.exports = app;
