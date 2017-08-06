const express = require('express');
const validator = require('validator');

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
    return res.status(200).end();
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
    return res.status(200).end();
});

module.exports = router;