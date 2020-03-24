const express = require('express');
const router = express.Router();
const {  ensureAuthenticated } = require('../config/auth');


/* GET Home page */
router.get('/', (req, res) => res.render('welcome'));

/* GET Dashboard page (using ensureAuthenticated) */
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name
    }));

module.exports = router;
