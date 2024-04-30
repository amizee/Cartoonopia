const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const bearerHeader = req.header('Authorization');

    if (!bearerHeader) return res.status(401).json({ error: 'Access denied, Token required' });
    try {
        var bearer = bearerHeader.split(" ");
        token = bearer[1];
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.id = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: error });
    };
};


module.exports = authenticateToken;