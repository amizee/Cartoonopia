const express = require("express");
const router = express.Router();
const verifyToken = require('../../auth.js');
const user_controller = require("../controllers/userController");
const char_controller = require('../controllers/charController');
const contribution_controller = require("../controllers/contributionController");

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

router.get('/', user_controller.getIndex);

router.get('/users', async (req, res) => {
    const query = req.query.value;
    const results = await user_controller.getUsers(query); // Replace performSearch with your actual search function
    // console.log("results", results)
    res.json({ results });
});

/* Get all characters (remove verifytoken for testing)*/
router.get('/allchar', verifyToken, char_controller.getAllChar);
//router.get('/allchar', char_controller.getAllChar);

/* Individual Character page */
router.get('/allchar/:id', verifyToken, char_controller.getOneChar);
//router.get('/allchar/:id', char_controller.getOneChar);

router.get('/users/:id', async (req, res) => {
    res.send("User " + req.params.id);
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
//router.get('/newchar', char_controller.getNewChar);
router.post('/newchar', verifyToken, char_controller.createCharacterContribution);

/* Edit/delete character */
router.post('/allchar/:id/edit', verifyToken, char_controller.createCharacterContribution);
router.post('/allchar/:id/delete', verifyToken, char_controller.createCharacterContribution);

router.get('/contributions', verifyToken, contribution_controller.getAllContributions);

module.exports = router;