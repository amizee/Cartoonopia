const asyncHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');
const contributionInstance = require('../models/contribution');
const characterInstance = require('../models/character');
const userController = require('../controllers/userController');

module.exports.getAllContributions = [
    asyncHandler(async (req, res, next) => {
        
        const allContributions = await getAll();
        res.status(200).json(allContributions);
    }),
];

module.exports.updateContribution = [
    asyncHandler(async (req, res, next) => {

        const obj = new Object;
        obj._id = new ObjectId(req.id);

        const filter = { contribution_id: req.body.contribution_id };
        const update = {"$set": {status: req.body.status, reviewed_by: obj}};

        await contributionInstance.findOneAndUpdate(filter, update)
        .then( async () => {
            
            if (req.body.status === "Approved") {
                await handleContribution(req.body.contribution_id);
            }
            
            res.status(200).json({
                success : true,
                message: "Update success"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    })
];

module.exports.getHistory = [
    asyncHandler(async (req, res, next) => {

        try {
            const listOfCharacters = await characterInstance.find();
            console.log("list of characters: ", listOfCharacters);
            const historyData = {}
            for (x in listOfCharacters) {
                const char = listOfCharacters[x];
                console.log("LOC CHAR: ", char);
                const filter = {
                    "data.id": char.id,
                    status: "Approved"
                }

                console.log("filter: ", filter);
                
                const charHistory = [];
                const firstIteration = {
                    id: null,
                    name: null,
                    description: null,
                    subtitle: null,
                    image_url: null,
                    strength: 0,
                    speed: 0,
                    skill: 0,
                    fear_factor: 0,
                    power: 0,
                    intelligence: 0,
                    wealth: 0
                }
                const charData = await contributionInstance.find(filter).sort({date: 1});
                console.log("char data: ", charData);
                for (i in charData) {
                    const item = charData[i];
                    if (item.action === "AddCharacter") {
                        firstIteration.id = item.data.id;
                        firstIteration.name = item.data.name;
                        firstIteration.description = item.data.description;
                        firstIteration.subtitle = item.data.subtitle;
                        firstIteration.image_url = item.data.image_url;
                        firstIteration.strength = item.data.strength;
                        firstIteration.speed = item.data.speed;
                        firstIteration.skill = item.data.skill;
                        firstIteration.fear_factor = item.data.fear_factor;
                        firstIteration.power = item.data.power;
                        firstIteration.intelligence = item.data.intelligence;
                        firstIteration.wealth = item.data.wealth;
                        
                        const result = [firstIteration, {
                            action: "AddCharacter",
                            user: userController.getUsernameById(item.user_id._id),
                            reviewed_by: userController.getUsernameById(item.reviewed_by._id),
                            date: item.date
                        }];
                        charHistory.push(result);
                    } else if (item.action === "EditCharacter") {
                        const statComp = {}
                        for (stat in item.data) {
                            if (stat === "id") {
                                continue;
                            }
                            statComp[stat] = [firstIteration.stat, item.data.stat];
                            firstIteration.stat = item.data.stat;
                        }

                        const result = [statComp, {
                            action: "EditCharacter",
                            user: userController.getUsernameById(item.user_id._id),
                            reviewed_by: userController.getUsernameById(item.reviewed_by._id),
                            date: item.date
                        }];
                        charHistory.push(result);
                    } else if (item.action === "DeleteCharacter") {
                        charHistory.push([firstIteration, {
                            action: "DeleteCharacter",
                            user: userController.getUsernameById(item.user_id._id),
                            reviewed_by: userController.getUsernameById(item.reviewed_by._id),
                            date: item.date
                        }]);
                    } else {
                        console.log("how did we get here?");
                    }
                }
                historyData[char.id] = charHistory;
            }

            console.log(historyData);
            res.status(200).json(historyData);
        } catch(e) {
            console.log("Error getting history: ", e);
        }
    })
]

async function handleContribution(contributionId) {
    try {
        const cont = await contributionInstance.findOne({contribution_id: contributionId});
        const contData = cont.data;
        console.log("contdata: ", contData);
        if (cont.action === "EditCharacter") {
            const updateFields = {"$set": contData};
            
            console.log(updateFields);
            await characterInstance.findOneAndUpdate({id: contData.id}, updateFields)
                .then(() => {
                    console.log("Edited character: ", updateFields);
                }).catch(err => {
                    console.log("error editing character: ", err);
                });
        } else if (cont.action === "AddCharacter") {
            const newCharacter = new characterInstance({
                id: contData.id,
                name: contData.name,
                active: true,
                subtitle: contData.subtitle,
                description: contData.description,
                image_url: contData.image_url,
                strength: contData.strength,
                speed: contData.speed,
                skill: contData.skill,
                fear_factor: contData.fear_factor,
                power: contData.power,
                intelligence: contData.intelligence,
                wealth: contData.wealth
            });

            await newCharacter.save()
                .then(() => {
                    console.log("saved new character: ", newCharacter);
                }).catch(err => {
                    console.log("error saving new character: ", err);
                });
        } else if (cont.action === "DeleteCharacter") {
            await characterInstance.findOneAndUpdate({id: contData.id}, {active: false})
                .then(() => {
                    console.log("Set character to inactive");
                }).catch(err => {
                    console.log("error setting character to inactive: ", err);
                });
        } else {
            console.log("how did we get here?");
        }
    } catch (e) {
        console.log("Error handling contribution data: ", e);
    }
}

module.exports.handleContribution = handleContribution;




async function getAll() {
    try {
        const all = await contributionInstance.find();
        return all;
    } catch (error) {
        console.error('Error obtaining contributions: ', error);
        return null;
    }
};
