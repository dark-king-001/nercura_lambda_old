const express = require('express');

const router = express.Router();

// home
router.get('/admin_panel',(req, res) => {
    res.render('Admin_panel')
})

module.exports = router;