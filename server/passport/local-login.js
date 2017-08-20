const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');


module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim()
    };

    //find a user by email
    return User.findOne({ email: userData.email }, (err, user) => {
        if (err) { return done(err); }

        if(!user) {
            const error = new Error('Wrong email or password.  Please try again.');
            error.name = 'BadCredentials';
            return done(error);
        }

        return user.comparePassword(userData.password, (passwordErr, isMatch) => {
            if (err) { return done(err); }

            if (!isMatch) {
                const error = new Error('Incorrect email or password');
                error.name = 'BadCredentials';

                return done(error);
            }

            const payload = {
                sub: user._id
            };

           const token = jwt.sign(paylod, config.jwtSecret); 
           const data = {
               name: user.name
           };

           return done(null, token, data);
        });
    });
});