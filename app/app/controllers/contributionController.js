const asyncHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');
const contributionInstance = require('../models/contribution');
const characterInstance = require('../models/character');

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
