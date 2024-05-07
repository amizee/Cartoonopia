const asyncHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');
const contributionInstance = require('../models/contribution');

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
        .then(() => {
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
