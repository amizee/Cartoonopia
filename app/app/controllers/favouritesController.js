const asyncHandler = require("express-async-handler");
const favouriteInstance = require('../models/favourite');
const mongoose = require("mongoose");
const characterInstance = require("../models/character");
const {ObjectId} = require("mongodb");

module.exports.addFavourite = [
  asyncHandler(async (req, res, next) => {
    // console.log("goes to update");
    const userId = new mongoose.Types.ObjectId(req.body.id);
    const filter = {'user_id._id': userId};
    let favourites = await favouriteInstance.find(filter);

    // If user doesn't have any favourites yet, create a new favourite
    if (favourites.length === 0) {
      const userObject = {
        _id: userId
      }
      const newFavourite = new favouriteInstance({
        user_id: userObject,
        characters: []
      });

      await newFavourite.save()
        .then(() => {
          console.log("saved new favourite: ", newFavourite);
        }).catch(err => {
          console.log("error saving new favourite: ", err);
        });
      // Include the newly favourited char
      favourites = await favouriteInstance.find(filter);
    }

    const charId = req.body.character;
    // console.log(charId);
    let characters = favourites[0].characters;
    // console.log("characters", characters);
    const index = characters.indexOf(charId);
    // console.log("index", index);
    if (index === -1) { // if char not found, add to users' favourites
      characters.push(charId);
      const update = {'characters': characters};
      console.log(characters);
      const doc = await favouriteInstance.findOneAndUpdate(filter, update);
    } else {
      console.log("no update needed");
    }
    res.status(200).json({update: 'success'});
  }),
];

module.exports.deleteFavourite = [
  asyncHandler(async (req, res, next) => {
    // console.log("goes to delete");
    const userId = new mongoose.Types.ObjectId(req.body.id);
    const filter = {'user_id._id': userId};
    const favourites = await favouriteInstance.find(filter);

    const charId = req.body.character;
    let characters = favourites[0].characters;
    const index = characters.indexOf(charId);
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