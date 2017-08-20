const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();

//validate the sign up form 
function validateSignUpForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' ||  !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide an correct email address.';
    }
    
    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        errors.name = 'Please provide your name.';
    } 

    if (!isFormValid) {
        message = 'Please check for mistakes.';
    }

    return { 
        success: isFormValid,
        message,
        errors
    };
}



//Validates the login form 
function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Plese provide your email address.';
        }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = "Please provide your password.";

    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

router.post('/signup', (req,res) => {
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('local-signup', (err) => {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message:'Check the form for errors.',
                    errors: {
                        email: 'This email is being used.  Try logging in.'
                    }
                });
            }

            return res.status(400).json({
                success: false,
                message:'Could not proocess the form.'
            });
        }

        return res.status(200).json({
            success: truw,
            message: 'Success!  Now you can log in.'
        });
    })(req, res, next);
});

router.post('/login', (req, res) => {
    const validationResult = validationLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('local-login', (err, token, userData) => {
        if (err) {
            if (err.name === 'BadCredentials') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            return RTCSessionDescription.status(400).json({
                success: false,
                message: 'could not process the form.'
            });
        }

        return res.json({
            success: true,
            message: 'You\'ve successfully logged in!',
            token, 
            user: userData
        });
    })(req, res, next);
});

module.exports = router;