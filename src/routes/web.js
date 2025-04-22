const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello World! and nodemon')
})
router.get('/abc', (req, res) => {
    res.send('<h1>Hello abs</h1>')
})
router.get('/bao', (req, res) => {
    res.render('sample.ejs')
})

module.exports = router;
