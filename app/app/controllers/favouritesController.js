const asyncHandler = require("express-async-handler");
const favouriteInstance = require('../models/favourite');
const mongoose = require("mongoose");

module.exports.addFavourite = [
  asyncHandler(async (req, res, next) => {
    const userId = new mongoose.Types.ObjectId(req.body.id);
    const filter = {'user_id._id': userId};
    const favourites = await favouriteInstance.find(filter);

    const charName = req.body.character.toLowerCase();
    let characters = favourites[0].characters;
    const index = characters.indexOf(charName);
    if (index === -1) { // if not found, add to users' favourites
      characters.push(charName);
      const update = {'characters': characters};
      const doc = await favouriteInstance.findOneAndUpdate(filter, update);
    } else {
      console.log("no update needed");
    }
    res.status(200).json({update: 'success'});
  }),
];

module.exports.deleteFavourite = [
  asyncHandler(async (req, res, next) => {
    console.log("goes to delete");
    const userId = new mongoose.Types.ObjectId(req.body.id);
    const filter = {'user_id._id': userId};
    const favourites = await favouriteInstance.find(filter);

    const charName = req.body.character.toLowerCase();
    let characters = favourites[0].characters;
    const index = characters.indexOf(charName);
    if (index > -1) { // if found, delete from users' favourites
      characters.splice(index, 1);
      console.log(characters);
      const update = {'characters': characters};
      const doc = await favouriteInstance.findOneAndUpdate(filter, update);
    } else {
      console.log("no delete needed");
    }
    res.status(200).json({delete: 'success'});
  }),
];