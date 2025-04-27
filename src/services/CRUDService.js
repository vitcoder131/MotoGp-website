const connection = require("../config/database");


const getAllUser = async() =>{
    let [results, fields] = await connection.query('select * from Rider u');
    return results;
}

const getUserbyId = async(userId)=>{
    let [results, fields] = await connection.query('select * from Rider where idrider=?', [userId]);
    
    let user = results && results.length > 0 ? results[0] :{};

    return user;
}
const updateUserById = async(email, name, city, userId) =>{
    let [result, fields] = await connection.query(
        // ` INSERT INTO Users(email, name, city )  VALUES (?, ?, ?)`, 
        `UPDATE Rider 
        SET name = ?,idteam =?, pictureId =?, points = ?
        WHERE id = ?`
        , [name, idteam, pictureId, point, idrider]
    );
}
const deleteUserById = async(id) => {
    let [result, fields] = await connection.query(
        `DELETE FROM Users WHERE id = ?`, [id]
    );
}
module.exports ={
    getAllUser, getUserbyId, updateUserById, deleteUserById
}