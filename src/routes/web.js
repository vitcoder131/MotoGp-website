const express = require('express');
const{getHomepage, getAbc, getalo} = require('../controllers/homeController')
const router = express.Router();

//route.method(, handle)

router.get('/', getHomepage);

router.get('/abc', getAbc)
router.get('/bao', getalo)

module.exports = router;
