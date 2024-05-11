const asyncHandler = require("express-async-handler");
const favouriteInstance = require('../models/favourite');
const contributionInstance = require('../models/contribution');
const userInstance = require('../models/user');
const characterInstance = require('../models/character');
const axios = require("axios");
const mongoose = require("mongoose");
const charController = require('./charController');
const adminInstance = require("../models/admin");

module.exports.getFavourites = [
    asyncHandler(async (req, res, next) => {
        let userId = req.query.id;
        userId = new mongoose.Types.ObjectId(userId);
        const filter = { 'user_id._id': userId };
        const userFavourites = await favouriteInstance.find(filter); // favourite chars by char_id
        if (userFavourites.length === 0) {
            res.status(200).json({});
            return;
        }

        let favourites = {}; // character name: image_url
        for (const charId of userFavourites[0].characters) {
            const res = await getUrlAndNameForCharacter(charId);
            favourites[charId] = res;
        }
        console.log('favourites', favourites);
        res.status(200).json(favourites);
    }),
];

async function getUrlAndNameForCharacter(character) {
    filter = {
        id: { $regex: new RegExp(character, 'i') },
    };
    const res = await characterInstance.find(filter).select('image_url name');
    return res;
}

module.exports.getContributions = [
    asyncHandler(async (req, res, next) => {
        const user_id = req.params.id;
        const userId = new mongoose.Types.ObjectId(user_id);
        try {
            const contributions = await contributionInstance.find({'user_id._id': userId});
            res.status(200).json(contributions);
        } catch (error) {
            console.log(error);
        }
    }),
]

module.exports.deleteContributions = [
    asyncHandler(async (req, res, next) => {
        const contribution_id = req.params.id;
        try {
            const contribution = await contributionInstance.findOneAndDelete({contribution_id: contribution_id});
            res.status(200).json(contribution);
        } catch (error) {
            console.log(error);
        }
    }),
]

module.exports.getUsers = [
    asyncHandler(async (req, res, next) => {
        const input = req.query.input;
        const id = req.query.id;
        const nameSplit = input.split(" ");
        const firstname = nameSplit[0];
        const lastname = nameSplit[1];
        let filter;
        if (lastname != null && lastname.length > 0) {
            filter = {
                firstname: { $regex: new RegExp(firstname, 'i') }, // case-insensitive search
                lastname: { $regex: new RegExp(lastname, 'i') }
            };
        } else {
            filter = {
                firstname: { $regex: new RegExp(firstname, 'i') },
            };
        }
        const users = await userInstance.find(filter);
        const updatedUsers = await Promise.all(users.map(async user => {
            let admin = await adminInstance.findById(id);
            admin = admin !== null;
            return {
                user, // Keep existing properties
                isAdmin: admin
            };
        }));
        // console.log("updated user", updatedUsers);
        res.status(200).json(updatedUsers);
    }),
]

module.exports.getUser = [
    asyncHandler(async (req, res, next) => {
        const name = req.query.name;
        const nameSplit = name.split("-");
        const firstname = nameSplit[0];
        const lastname = nameSplit[1];

        const userId = await userInstance.findOne({'firstname': firstname, 'lastname': lastname}).select('_id');
        res.status(200).json({userId});
    }),
]

module.exports.getCharacters = [
    asyncHandler(async (req, res, next) => {
        const input = req.query.input;
        const filter = {name: { $regex: new RegExp(input, 'i') },};
        const characters = await characterInstance.find(filter);
        res.status(200).json(characters);
    }),
]
