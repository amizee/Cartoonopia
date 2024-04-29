const express = require('express');
const router = express.Router();
const verifyToken = require('../auth.js');

router.get('/test', verifyToken, (req, res) => {
    res.status(200).json({ message: 'route accessed' });
});

module.exports = router;