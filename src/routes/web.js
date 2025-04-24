const express = require('express');
const{getHomepage, getAbc, getalo, postCreateUser} = require('../controllers/homeController')
const router = express.Router();

//route.method(, handle)

router.get('/', getHomepage);

router.get('/abc', getAbc)
router.get('/bao', getalo)
router.post('/creat-user', postCreateUser);

module.exports = router;
