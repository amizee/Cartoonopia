const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const Admin = require("./app/models/admin");

function authenticateToken(req, res, next) {
    const bearerHeader = req.header('Authorization');

    if (!bearerHeader) return res.status(401).json({ error: 'Access denied, Token required' });
    try {
        var bearer = bearerHeader.split(" ");
        token = bearer[1];
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.id = decoded.id;

        Admin.findOne({ _id: new ObjectId(decoded.id) })
        .then(existingUser => {
            if (existingUser) {
                next();
            } else {
                res.status(401).json({message: "Unauthorized access"});
            }
        })
        
    } catch (error) {
        res.status(401).json({ error: error });
    };
};


module.exports = authenticateToken;