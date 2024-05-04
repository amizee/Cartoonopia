const asyncHandler = require("express-async-handler");
const favouritesInstance = require('../models/favourite');
const contributionInstance = require('../models/contribution');
const userInstance = require('../models/user');
const axios = require("axios");

module.exports.getIndex = [
    asyncHandler(async (req, res, next) => {
        // const favourites = getFavourites(req.headers['authorization']);
        const contributions = await getContributions(req.headers['authorization']);
        // console.log(contributions);
        // res.render('../views/index.ejs', {characters: ['superman', 'batman'], contributions: [{action: "EditCharacter", description: "placeholder", date: '2024-05-02', status: 'pending', id: 14},
        //         {action: "AddCharacter", description: "placeholder2", date: '2024-05-03', status: 'approved', id: 13}]});
        res.render('../views/index.ejs', {characters: ['superman', 'batman'], contributions: contributions});
    }),
];

async function getFavourites(token) {
    const response = await axios.get('http://localhost:3000/test', {
        headers: {
            Authorization: token
        }
    });

    const userId = response.data.id;
    const favourites = await favouritesInstance.find({user_id: userId}).populate('user_id').exec();
    return favourites;
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

module.exports.getUsers = async function(query) {
    const nameSplit = query.split(" ");
    const firstname = nameSplit[0];
    const lastname = nameSplit[1];
    let filter;
    if (lastname != null && lastname.length > 0) {
        filter = {
            firstname: { $regex: new RegExp(firstname, 'i') }, // Case-insensitive regex match for firstname
            lastname: { $regex: new RegExp(lastname, 'i') } // Case-insensitive regex match for lastname
        };
    } else {
        filter = {
            firstname: { $regex: new RegExp(firstname, 'i') }, // Case-insensitive regex match for firstname
        };
    }
    const users = await userInstance.find(filter);
    console.log(users);
    return users;
}

