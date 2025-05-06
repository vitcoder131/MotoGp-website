const connection = require("../config/database");


const getAllRider = async () => {
    let [results, fields] = await connection.query('select * from Rider u');
    return results;
}

const getRiderbyId = async (RiderId) => {
    let [results, fields] = await connection.query('select * from Rider where idrider=?', [RiderId]);

    let Rider = results && results.length > 0 ? results[0] : {};

    return Rider;
}
const updateRiderById = async (name, idteam, pictureId, points, RiderId) => {
    let [result, fields] = await connection.query(
        `UPDATE Rider 
        SET name = ?,idteam =?, pictureId =?, points = ?
        WHERE idrider = ?`
        , [name, idteam, pictureId, point, RiderId]
    );
}
const deleteRiderById = async (RiderId) => {
    let [result, fields] = await connection.query(
        `DELETE FROM Rider WHERE idrider = ?`, [RiderId]
    );
}
//data team

const getAllTeam = async () => {
    let [results, fields] = await connection.query('select * from Team u');
    return results;
}
const getTeambyId = async (TeamId) => {
    let [results, fields] = await connection.query('select * from Team where idteam=?', [TeamId]);
    let Team = results && results.length > 0 ? results[0] : {};
    return Team;
}
const deleteTeamById = async (TeamId) => {
    let [result, fields] = await connection.query(
        `DELETE FROM Team WHERE idteam = ?`, [TeamId]
    );
}
//xu ly data calandar
const getAllCalendar = async () => {
    let [results, fields] = await connection.query('select * from Calendar u');
    return results;
}
const getCalendarbyId = async (CalendarId) => {
    let [results, fields] = await connection.query('SELECT * FROM Calendar WHERE idcalendar =?', [CalendarId]);
    let Calendar = results && results.length > 0 ? results[0] : {};
    return Calendar;
}
const DeleteCalendarbyId = async (CalendarId) => {
    let [result, fields] = await connection.query(
        `DELETE FROM Calendar WHERE idcalendar = ?`, [CalendarId]
    );
}


//data results
const getAllResults = async () => {
    let [results, fields] = await connection.query('select * from Results u');
    return results;
}
const getResultsbyId = async (ResultsId) => {
    let [results, fields] = await connection.query('SELECT * FROM Results WHERE idresult =?', [ResultsId]);
    let Results = results && results.length > 0 ? results[0] : {};
    return Results;
}
const DeleteResultsbyId = async (ResultsId) => {
    let [result, fields] = await connection.query(
        `DELETE FROM Results WHERE idresult = ?`, [ResultsId]
    );
}
module.exports = {
    DeleteResultsbyId, getResultsbyId, DeleteCalendarbyId, getAllRider, getTeambyId, getRiderbyId, deleteTeamById, updateRiderById, deleteRiderById, getAllTeam, getAllCalendar, getAllResults, getCalendarbyId
}