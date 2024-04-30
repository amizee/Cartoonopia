const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
const char_controller = require('../controllers/charController');
router.post(
    "/signup",
    user_controller.create_user
);

router.get('/', char_controller.getIndex);
router.get('/allchar', char_controller.getAllChar);
router.get('/newchar', char_controller.getNewChar);
router.post('/newchar', char_controller.createCharacter);
module.exports = router;