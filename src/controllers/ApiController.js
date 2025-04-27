const connection = require("../config/database")

//const pool = require('../config/database')

let getAllUsers = async (req, res) => {
    //http
    // 501 server broken
    const [rows, fields] = await connection.execute('SELECT * FROM Users');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })

}

let createNewUser = async (req, res) => {
    let { email, name, city } = req.body;
    if (!email || !name || !city) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await connection.execute(` INSERT INTO Users(email, name, city )  
        VALUES (?, ?, ?)`,
        [email, name, city]);


    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { email, name, city, id } = req.body;
    if (!email || !name || !city || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await connection.execute(`UPDATE Users 
        SET email = ?,name =?, city = ?
        WHERE id = ?`,
        [email, name, city, id]);
    return res.status(200).json({
        message: 'ok'
    })
}
let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await connection.execute(
        `DELETE FROM Users WHERE id = ?`,
        [userId])
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}