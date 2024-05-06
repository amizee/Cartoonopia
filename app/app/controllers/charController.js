const axios = require('axios');
const asyncHandler = require('express-async-handler');

const adminInstance = require('../models/admin');
const userInstance = require('../models/user');
const charInstance = require('../models/character');
const contributionInstance = require('../models/contribution');

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

/* module.exports.getNewChar = function(req, res) {
    res.render('newchar.ejs');
} */

/* Create Character contribution*/
/* Can add type of contribution to header maybe, then can change contribution
body based off of it so i dont need 3 functions for that */
module.exports.createCharacterContribution = [
    asyncHandler(async (req, res, next) => {



        const userEmail = req.body.data.user_email;
        console.log(userEmail);
        const userInfo = await userInstance.findOne({email: userEmail});
        const userId = userInfo._id;
        console.log("found user id: ", userId);        

        console.log("request body: ", req.body);
        const newContributionId = await generateContributionId();
        console.log("new contribution id: ", newContributionId);

        

        const currentDate = new Date();
        const { 
            id,
            name, 
            subtitle, 
            description, 
            strength, 
            speed, 
            skill, 
            fear_factor, 
            power, 
            intelligence, 
            wealth,
            image_url
        } = req.body.data;

        let actionType = "AddCharacter"; // Default action type

        // Check if the request path ends with "/edit" or "/delete"
        if (req.path.endsWith("/edit")) {
            /* Check if existing contribution exists for the character */
            const existing = await contributionInstance.find({"data.id": id});
            console.log("exists?: ", existing);
            if (existing.length > 0) {
                const pending = existing.find(contribution => contribution.status === "Pending");
                if (pending) {
                    console.log("contribution for this character already exists");
                    return res.status(201).json({ message: "Contribution for this character already exists." });
                }
            }
            console.log("changed to edit")
            actionType = "EditCharacter";
        }
            
        const data = {
            id: id,
            name: name,
            subtitle: subtitle,
            description: description,
            image_url: image_url,
            strength: strength,
            speed: speed,
            skill: skill,
            fear_factor: fear_factor,
            power: power,
            intelligence: intelligence,
            wealth: wealth
        };
        console.log("data field1: ", data);

        for (const key in data) {
            if (!data[key]) {
                delete data[key];
            }
        }

        console.log("data field2: ", data);
            
        const newContribution = new contributionInstance({
            contribution_id: newContributionId,
            user_id: userId,
            action: actionType,
            status: "Pending", //depends on user or admin
            reviewed_by: null,
            date: currentDate,
            data: data
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
                console.log(newContribution);
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