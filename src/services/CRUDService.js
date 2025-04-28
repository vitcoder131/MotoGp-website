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

const getAllTeam = async() =>{
    let [results, fields] = await connection.query('select * from Team u');
    return results;
}
const getAllCalender = async() =>{
    let [results, fields] = await connection.query('select * from Calendar u');
    return results;
}
const getAllResults = async() =>{
    let [results, fields] = await connection.query('select * from Results u');
    return results;
}
module.exports ={
    getAllRider, getRiderbyId, updateRiderById, deleteRiderById, getAllTeam, getAllCalender, getAllResults
}