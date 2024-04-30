const axios = require('axios');
const asyncHandler = require('express-async-handler');

const adminInstance = require('../models/admin');
const charInstance = require('../models/character');
const contributionInstance = require('../models/contribution');

module.exports.getIndex = function(req, res) {
    res.render('../views/index.ejs');
}
module.exports.getAllChar = function(req, res) {
    res.render('allchar.ejs');
}
module.exports.getNewChar = function(req, res) {
    res.render('newchar.ejs');
}

/* Create Character contribution*/
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
        if (adminInstance.isAdmin) {
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
    
}

async function generateContributionId() {
    const latest = await contributionInstance.findOne().sort({date: -1});

    let nextId = 1;
    if (latest) {
        const latestId = Number(latest.contribution_id);
        nextId = latestId + 1;
    }

    return String(nextId);

}

/* Edit Character */

/* Delete Character */