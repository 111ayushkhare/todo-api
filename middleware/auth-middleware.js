// Importing npm packages
const jwt = require('jsonwebtoken');

// Importing modules
const accessConfig = require('../config/access-config.json');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        await jwt.verify(token, accessConfig.env.JWT_ACCESS, (error, decoded) => {
            if (error) {
                res.status(401).send({
                    message: "Invalid token, authentication failed !",
                    error,
                });
            } else {
                req.id = decoded._id;
                req.email = decoded.email;
                next();
            }
        });
    } catch(error) {
        res.status(500).send({ message: "Server error" });
    }
};

// Exporting authentication middleware method
module.exports = isAuthenticated;