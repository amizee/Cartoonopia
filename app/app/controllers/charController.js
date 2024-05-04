const axios = require('axios');
const asyncHandler = require('express-async-handler');

const adminInstance = require('../models/admin');
const charInstance = require('../models/character');
const contributionInstance = require('../models/contribution');

module.exports.getAllChar = [
    asyncHandler(async (req, res, next) => {
        
        const allChars = getAllCharacters();
        res.status(200).json(allChars);
    }),
];

module.exports.getNewChar = function(req, res) {
    res.render('newchar.ejs');
}

/* Create Character contribution*/
/* Can add type of contribution to header maybe, then can change contribution
body based off of it so i dont need 3 functions for that */
module.exports.createCharacterContribution = [
    asyncHandler(async (req, res, next) => {

        console.log("token: ", req.headers['authorization']);
        const response = await axios.get('http://localhost:3000/test', {
            headers: {
                Authorization: req.headers['authorization']
            }
        });

        const userId = response.data.id;

        console.log("request body: ", req.body);
        const newContributionId = await generateContributionId();
        console.log("new contribution id: ", newContributionId);
        const currentDate = new Date();
        const { name, 
            subtitle, 
            description, 
            strength, 
            speed, 
            skill, 
            fearFactor, 
            power, 
            intelligence, 
            wealth } = req.body;
            
        const newContribution = new contributionInstance({
            contribution_id: newContributionId,
            user_id: userId,
            action: "AddCharacter",
            status: "Pending", //depends on user or admin
            reviewed_by: null,
            date: currentDate,
            data: {
                id: name,
                subtitle: subtitle,
                description: description,
                image_url: "placeholder",
                strength: strength,
                speed: speed,
                skill: skill,
                fear_factor: fearFactor,
                power: power,
                intelligence: intelligence,
                wealth: wealth
            }
        });

        /* Query admin to see if the user adding is an admin */
        if (isAdmin(userId) == true) {
            newContribution.status = "Accepted";
            newContribution.reviewed_by = userId;
        }

        await newContribution.save()
            .then(() => {
                console.log("Saved new contribution");
                res.status(200).send(newContribution);
            }).catch (err => {
                console.log("Error saving contribution: ", err.message);
        });
    }),
];

/* Create character record from contribution */
module.exports.createCharacterRecord = function(req, res) {
    
};

async function generateContributionId() {
    const latest = await contributionInstance.findOne().sort({date: -1});

    let nextId = 1;
    if (latest) {
        const latestId = Number(latest.contribution_id);
        nextId = latestId + 1;
    }

    return String(nextId);
}

async function getAllCharacters() {
    try {
        const all = await charInstance.find();
        console.log("All chars: ", all);
        return all;
    } catch (error) {
        console.error('Error obtaining characters: ', error);
        return null;
    }
};

async function isAdmin(userId) {
    try {
        const admin = await adminInstance.findById(userId);
        console.log("is admin: ", admin);
        if (admin == null) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}

/* Edit Character */

/* Delete Character */