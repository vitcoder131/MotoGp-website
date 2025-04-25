const connection = require('../config/database');
const { getAllUser, getUserbyId, updateUserById } = require('../services/CRUDService');

const getHomepage = async (req, res) => {

    let results = await getAllUser();
    return res.render('home.ejs', { listUsers: results })
}

const getAbc = (req, res) => {
    res.send('abc')
}
const getalo = async (req, res) => {
    res.render('sample.ejs')
}
const postCreateUser = async (req, res) => {


    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    console.log('name =', name, 'email =', email, 'city =', city);

    // connection.query(
    //     ` INSERT INTO 
    //     Users(email, name, city ) 
    //     VALUES (?, ?, ?)`,
    //     [email, name, city],
    //     function (err, results) {

    //         res.send('Create use succeed !')
    //     }
    // );

    let [result, fields] = await connection.query(
        ` INSERT INTO Users(email, name, city )  VALUES (?, ?, ?)`, [email, name, city]
    );
    console.log("check", result);
    res.send('Create use succeed !')
    //     connection.query(
    //         `select * from Users u`,
    //         function(err, results,fields){
    //             console.log(" >>result =", results);
    //         }
    //     );
    // const [result, fields] = await connection.query('select * from Users u');
    // console.log('check result', result);
}
const postUpdateUser = async (req, res) => {

    let userId = req.body.userId;
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    await updateUserById(email, name, city, userId)
    
    // console.log("check", result);



    // res.send('Update use succeed !')
    res.redirect('/');
}


const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id;

    let user = await getUserbyId(userId);
    res.render('edit.ejs', { userEdit: user });
}

const postDeleteUser =(req, res) =>{
    res.send('delete user')
}

module.exports = {
    getHomepage, getAbc, getalo, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser
    ,postDeleteUser
}