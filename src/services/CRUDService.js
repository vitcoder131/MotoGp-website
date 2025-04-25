const connection = require("../config/database");


const getAllUser = async() =>{
    let [results, fields] = await connection.query('select * from Users u');
    return results;
}

const getUserbyId = async(userId)=>{
    let [results, fields] = await connection.query('select * from Users where id=?', [userId]);
    
    let user = results && results.length > 0 ? results[0] :{};

    return user;
}
const updateUserById = async(email, name, city, userId) =>{
    let [result, fields] = await connection.query(
        // ` INSERT INTO Users(email, name, city )  VALUES (?, ?, ?)`, 
        `UPDATE Users 
        SET email = ?,name =?, city = ?
        WHERE id = ?`
        , [email, name, city, userId]
    );
}

module.exports ={
    getAllUser, getUserbyId, updateUserById
}