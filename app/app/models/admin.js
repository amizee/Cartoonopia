const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {

    },{
    versionKey: false // You should be aware of the outcome after set to false
    }
);

var Admin;

if (mongoose.models.Admin) {
    Admin = mongoose.model('Admin');
} else {
    Admin = mongoose.model('Admin', adminSchema);
}
module.exports = Admin