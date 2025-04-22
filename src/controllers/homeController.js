

const getHomepage = (req, res) => {
    res.send('Hello World! and nodemon')
}

const getAbc = (req, res) => {
    res.send('abc')
}
const getalo = (req, res) => {
    res.render('sample.ejs')
}

module.exports ={
    getHomepage, getAbc, getalo
}