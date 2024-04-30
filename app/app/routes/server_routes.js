const express = require("express");
const router = express.Router();
const verifyToken = require('../../auth.js');
const user_controller = require("../controllers/userController");
const char_controller = require('../controllers/charController');
router.post(
    "/signup",
    user_controller.create_user
);
router.post(
    "/login",
    user_controller.login_user
);

router.get('/test', verifyToken, (req, res) => {
    res.status(200).json({ message: 'route accessed', id: req.id });
});

router.get('/', char_controller.getIndex);
router.get('/allchar', char_controller.getAllChar);
router.get('/newchar', char_controller.getNewChar);
//router.post('/newchar', char_controller.createCharacter);
module.exports = router;