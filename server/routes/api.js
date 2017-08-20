const express = require('express');

const router = new express.Router();

router.get('/SearchBar', (req, res) => {
    res.status(200).json({
        message: 'Welcome! What are your dietary restrictions?'
    });

});


module.exports = router;