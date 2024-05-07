const express = require("express");
const router = express.Router();
const verifyToken = require('../../auth.js');
const verifyTokenAdmin = require('../../adminAuth.js');
const user_controller = require("../controllers/userController");
const char_controller = require('../controllers/charController');
const admin_controller = require('../controllers/adminController.js')
const contribution_controller = require("../controllers/contributionController");

router.post(
    "/signup",
    user_controller.create_user
);
router.post(
    "/login",
    user_controller.login_user
);


router.post('/admin', verifyTokenAdmin, admin_controller.addAdmin);
router.delete('/admin', verifyTokenAdmin, admin_controller.deleteAdmin);


/* router.get('/test', (req, res) => {
    res.status(200).json({ message: 'route accessed', id: req.id });
}); */

//router.get('/', char_controller.getIndex);

/* Get all characters (remove verifytoken for testing)*/
router.get('/allchar', verifyToken, char_controller.getAllChar);
//router.get('/allchar', char_controller.getAllChar);

/* Individual Character page */
router.get('/allchar/:id', verifyToken, char_controller.getOneChar);
//router.get('/allchar/:id', char_controller.getOneChar);


/* Add new character */
//router.get('/newchar', char_controller.getNewChar);
router.post('/newchar', verifyToken, char_controller.createCharacterContribution);

/* Edit/delete character */
router.post('/allchar/:id/edit', verifyToken, char_controller.createCharacterContribution);
router.post('/allchar/:id/delete', verifyToken, char_controller.createCharacterContribution);

router.get('/contributions', verifyToken, contribution_controller.getAllContributions);
router.put('/contributions', verifyTokenAdmin, contribution_controller.updateContribution);

module.exports = router;