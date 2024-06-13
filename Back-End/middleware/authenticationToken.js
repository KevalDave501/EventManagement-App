const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access token required');
    }

    jwt.verify(token, 'okayokay123', (err, user) => {
        if (err) {
            console.error(err);
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;