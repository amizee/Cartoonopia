const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

/* db stuff? */
mongoose.connect('mongodb+srv://kevin:hGDMKGJ0cZVWonkG@cluster0.v5i7fte.mongodb.net/');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

/* bruh i can't figure out how to query the db */
const users = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

const Users = mongoose.model('Users', users);
/* const first = Users.find({firstname: 'Anita'}, function(err, docs) {
    if (err) {
        console.log(err);
    } else {
        console.log('docs: ', docs)
    }
}); */
//console.log(first);


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../frontend/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
	res.render('index.ejs');
});

app.listen(3000, function () {
	console.log('app listening on port 3000!');
});