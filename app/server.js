const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const methodOverride = require('method-override');
const usersRouter = require("./app/routes/server_routes");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://kevin:hGDMKGJ0cZVWonkG@cluster0.v5i7fte.mongodb.net/characters');
}

/* ------------------------------------------------------------------ */
app.use(methodOverride('_method'));
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/app/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', usersRouter);


/* ------------------------------------------------------------------ */
app.listen(5000, function () {
    console.log('backend app listening on port 5000 at http://localhost:5000');
});
module.exports = app;
