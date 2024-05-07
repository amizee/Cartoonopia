const axios = require('axios');
const asyncHandler = require('express-async-handler');

const adminInstance = require('../models/admin');
const userInstance = require('../models/user');
const charInstance = require('../models/character');
const contributionInstance = require('../models/contribution');

module.exports.getAllContributions = [
    asyncHandler(async (req, res, next) => {
        
        const allContributions = await getAll();
        res.status(200).json(allContributions);
    }),
];

module.exports.editCharacterFromContribution = [
    /* TODO */
];

module.exports.createCharacterFromContribution = [
    /* TODO */
];

async function getAll() {
    try {
        const all = await contributionInstance.find();
        console.log("All contributions: ", all);
        return all;
    } catch (error) {
        console.error('Error obtaining contributions: ', error);
        return null;
    }
};
