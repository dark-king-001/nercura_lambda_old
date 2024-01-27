const express = require('express');

const router = express.Router();

// home
router.get('/',(req, res) => {
    res.render('Home')
})

module.exports = router;