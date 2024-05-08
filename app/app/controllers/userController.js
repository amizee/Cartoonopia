const UserInstance = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const { get } = require("mongoose");
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
                            res.status(200).json({
                                user: newUser
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                    
                });
                
            } else {
                res.json({
                    success: false,
                    message: "User already exists..."
                });
            }
        })
    })
]; 

exports.login_user = [
    asyncHandler(async (req, res, next) => {
        
        await UserInstance.findOne({ email: req.body.email })
            .then(existingUser => {
                if (!existingUser) {
                    res.json({
                        success: false,
                        message: "User not exist"
                    });
                } else {
                    bcrypt.compare(req.body.password, existingUser.password)
                    .then(function(result) {
                        if (result==true) {
                            
                            const payload = {
                                id: existingUser._id,
                                email: existingUser.email
                            };
                            const token = jwt.sign(payload, 'SECRET_KEY', {
                                expiresIn: '1h',
                            });
                        
                            res.json({
                                success: true,
                                token: token,
                                id: existingUser._id
                              });
                        } else {
                            res.json({
                                success: false,
                                message: "Unauthorized Access"
                            });
                        }
                    })
                }
            })
            .catch(err => {
            console.log("Error is ", err.message);
            });
    })
];

async function getUsernameById(userId) {
    const user = await UserInstance.findOne({_id: userId});
    return user.firstname + " " + user.lastname;
}

module.exports.getUsernameById = getUsernameById;