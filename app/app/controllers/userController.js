const UserInstance = require("../models/user");

const asyncHandler = require("express-async-handler");


exports.create_user = [
    asyncHandler(async (req, res, next) => {

        var newUser = new UserInstance({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
            });

        await newUser
        .save()
        .then(() => {
            res.status(200).send(newUser);
        })
        .catch(err => {
            console.log("Error is ", err.message);
        });
    }),
];
  