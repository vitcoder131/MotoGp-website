const connection = require('../config/database');

const getHomepage = (req, res) => {
    return res.render('home.ejs')
}

const getAbc = (req, res) => {
    res.send('abc')
}
const getalo = (req, res) => {
    res.render('sample.ejs')
}
const postCreateUser =(req, res)=>{
    console.log("req.body ==>", req.body)
    res.send('Create sucess')
}

module.exports ={
    getHomepage, getAbc, getalo, postCreateUser
}