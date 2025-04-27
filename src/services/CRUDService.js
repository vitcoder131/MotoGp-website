const connection = require("../config/database");


const getAllRider = async() =>{
    let [results, fields] = await connection.query('select * from Rider u');
    return results;
}

const getRiderbyId = async(RiderId)=>{
    let [results, fields] = await connection.query('select * from Rider where idrider=?', [RiderId]);
    
    let Rider = results && results.length > 0 ? results[0] :{};

    return Rider;
}
const updateRiderById = async(name, idteam, pictureId,points, RiderId) =>{
    let [result, fields] = await connection.query(
        `UPDATE Rider 
        SET name = ?,idteam =?, pictureId =?, points = ?
        WHERE idrider = ?`
        , [name, idteam, pictureId, point, RiderId]
    );
}
const deleteRiderById = async(RiderId) => {
    let [result, fields] = await connection.query(
        `DELETE FROM Rider WHERE idrider = ?`, [RiderId]
    );
}
module.exports ={
    getAllRider, getRiderbyId, updateRiderById, deleteRiderById
}