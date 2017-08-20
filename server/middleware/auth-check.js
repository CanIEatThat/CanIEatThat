const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');


//auth checker function
module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status9401.end();
    
}
//the last part of the header authorization string
const token = req.headers.authorization.split(' ')[1];
//decode token using jwtSecret (secret key phrase)
return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    //see if user exists
    return User.findById(userId, (userErr, user) => {
        if (userErr || !user) {
            return res.status(401).end();
        }

        return next();
    });
});
};