const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

});

var Admin;

if (mongoose.models.Admin) {
    Admin = mongoose.model('Admin');
} else {
    Admin = mongoose.model('Admin', adminSchema);
}

/* adminSchema.statics.isAdmin = async function(userId) {
    try {
        const admin = await this.findById(userId);
        return admin !== null;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}; */

module.exports = Admin