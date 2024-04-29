const UserInstance = require("../models/user");
const bcrypt = require('bcrypt');

const asyncHandler = require("express-async-handler");
const saltRounds = 10;

exports.create_user = [
    asyncHandler(async (req, res, next) => {

        var newUser = new UserInstance({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
            });
        

        await UserInstance.findOne({ email: newUser.email })
        .then(async existingUser => {
            if (!existingUser) {
                bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });

                    } else {
                        newUser.password = hash;
                        newUser
                        .save()
                        .then(() => {
                            res.status(200).send(newUser);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                    
                });
                
            } else {
                res.send("User already exists...");
            }
        })
    })
]; 

exports.login_user = [
    asyncHandler(async (req, res, next) => {
        
        await UserInstance.findOne({ email: req.body.email })
            .then(existingUser => {
                if (!existingUser) {
                    res.send("User not exist");
                } else {
                    bcrypt.compare(req.body.password, existingUser.password)
                    .then(function(result) {
                        if (result==true) {
                            //add token
                            res.send(("User Authenticated"));
                        } else {
                            res.send("Unauthorized Access");
                        }
                    })
                }
            })
            .catch(err => {
            console.log("Error is ", err.message);
            });
    })
];