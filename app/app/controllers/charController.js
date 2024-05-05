const axios = require('axios');
const asyncHandler = require('express-async-handler');

const adminInstance = require('../models/admin');
const charInstance = require('../models/character');
const contributionInstance = require('../models/contribution');

module.exports.getIndex = function(req, res) {
    res.render('../views/index.ejs');
}
module.exports.getAllChar = [
    asyncHandler(async (req, res, next) => {
        
        const allChars = await getAllCharacters();
        res.status(200).json(allChars);
    }),
];

module.exports.getOneChar = [
    asyncHandler(async (req, res, next) => {
        try {
            const character = await charInstance.findOne({id: req.params.id});
            if (!character) {
              return res.status(404).json({ message: 'Character not found' });
            }
            res.status(200).json(character);
          } catch (error) {
            console.error('Error obtaining character details: ', error);
            res.status(500).json({ message: 'Error obtaining character details' });
          }
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

        let actionType = "AddCharacter"; // Default action type

        // Check if the request path ends with "/edit" or "/delete"
        if (req.path.endsWith("/edit")) {
            actionType = "EditCharacter";
        } else if (req.path.endsWith("/delete")) {
            actionType = "DeleteCharacter";
        }

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
            wealth,
            image_url } = req.body;
            
        const newContribution = new contributionInstance({
            contribution_id: newContributionId,
            user_id: userId,
            action: actionType,
            status: "Pending", //depends on user or admin
            reviewed_by: null,
            date: currentDate,
            data: {
                id: name,
                subtitle: subtitle,
                description: description,
                image_url: image_url,
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
            /* Call function to create character object somewhere here */
            
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