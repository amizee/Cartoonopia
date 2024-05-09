const asyncHandler = require("express-async-handler");
const favouriteInstance = require('../models/favourite');
const contributionInstance = require('../models/contribution');
const userInstance = require('../models/user');
const characterInstance = require('../models/character');
const axios = require("axios");
const mongoose = require("mongoose");

module.exports.getFavourites = [
    asyncHandler(async (req, res, next) => {
        const userId = req.query.id;
        const userFavourites = await queryFavourites(userId);

        if (userFavourites.length === 0) {
            res.status(200).json({});
            return;
        }

        let favourites = {}; // character name: image_url
        for (const character of userFavourites[0].characters) {
            const image_url = await getImageUrlForCharacter(character);
            favourites[character] = image_url;
        }
        res.status(200).json(favourites);
    }),
];

async function queryFavourites(user_id) {
    const userId = new mongoose.Types.ObjectId(user_id);
    const query = { 'user_id._id': userId };
    const favourites = await favouriteInstance.find(query);
    return favourites;
}

async function getImageUrlForCharacter(character) {
    filter = {
        name: { $regex: new RegExp(character, 'i') },
    };
    const imageUrl = await characterInstance.find(filter).select('image_url');
    return imageUrl;
}

async function getContributions(token) {
    // const response = await axios.get('http://localhost:3000/test', {
    //     headers: {
    //         Authorization: token
    //     }
    // });

    // const userId = response.data.id;
    try {
        const contributions = await contributionInstance.find({user_id: '663366f2cae4641d62fd97a2'}).populate('user_id').exec();
        return contributions;
    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteContributions = async function(id) {
    try {
        const contribution = await contributionInstance.findOneAndDelete({contribution_id: id});
        console.log("Deleted", contribution);
        return contribution;
    } catch (error) {
        console.log(error);
    }
}

module.exports.getUsers = [
    asyncHandler(async (req, res, next) => {
        const input = req.query.input;
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
        res.status(200).json(users);
    }),
]
