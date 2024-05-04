const express = require("express");
const router = express.Router();
const verifyToken = require('../../auth.js');
const login_controller = require("../controllers/loginController");
const char_controller = require('../controllers/charController');
const user_controller = require('../controllers/userController');
router.post(
    "/signup",
    login_controller.create_user
);
router.post(
    "/login",
    login_controller.login_user
);

router.get('/test', verifyToken, (req, res) => {
    res.status(200).json({ message: 'route accessed', id: req.id });
});

router.get('/', user_controller.getIndex);

router.get('/users', async (req, res) => {
    const query = req.query.value;
    const results = await user_controller.getUsers(query); // Replace performSearch with your actual search function
    // console.log("results", results)
    res.json({ results });
});

router.delete('/contributions/:id', async(req, res) => {
    try {
        const contribution = await user_controller.deleteContributions(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(401).json({ error: error });
    }
})
//null if contribution not found, maybe change error handling
/* Get all characters */
router.get('/allchar', verifyToken, char_controller.getAllChar);

/* Add new character */
router.get('/newchar', char_controller.getNewChar);
router.post('/newchar', verifyToken, char_controller.createCharacterContribution);

module.exports = router;