const Admin = require("../models/admin");
const UserInstance = require("../models/user");
const asyncHandler = require("express-async-handler");
const { ObjectId } = require('mongodb');



exports.addAdmin = [
    asyncHandler(async (req, res, next) => {

        const newAdmin = new Admin();
        newAdmin._id = new ObjectId(req.body.id);

        await UserInstance.findOne({ _id: newAdmin._id })
        .then(async existingUser => {
            if (!existingUser) {
                res.json({
                    success: false,
                    message: "User does not exist in system..."
                });
            }
        })


        await Admin.findOne({ _id: newAdmin._id })
        .then(async existingUser => {
            if (!existingUser) {
                newAdmin.save()
                .then(() => {
                    res.status(200).json({
                        success : true,
                        message : "Admin added",
                        admin: newAdmin
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
            } else {
                res.json({
                    success: false,
                    message: "User is already an admin..."
                });
            }

        })
    })

    
];


exports.deleteAdmin = [
    asyncHandler(async (req, res, next) => {

        const sender_id = req.id;
        const newAdmin = new Admin();
        newAdmin._id = new ObjectId(req.body.id);

        if (sender_id === req.body.id) {
            res.status(500).json({
                success: false,
                message: "Admin cannot downgrade itself..."
            });
        } else {
            await Admin.deleteOne({_id: newAdmin._id})
            .then(() => {
                res.status(200).json({
                    success: true
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        }

        

    })

];