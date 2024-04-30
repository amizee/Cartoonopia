const charInstance = require('../models/character');
const contributionInstance = require('../models/contribution');
const asyncHandler = require('express-async-handler');

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
exports.createCharacterContribution = [
    asyncHandler(async (req, res, next) => {
        console.log(req.body);
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
            contribution_id: generateContributionId(),
            user_id: None, //need user id
            action: "AddCharacter",
            status: "Pending", //depends on user or admin
            reviewed_by: None,
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
        await newContribution.save()
            .then(() => {
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