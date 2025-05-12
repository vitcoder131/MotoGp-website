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
        , [name, idteam, pictureId, points, RiderId]
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
    let [results, fields] = await connection.query('select * from Team where idteam=? ', [TeamId]);
    let Team = results && results.length > 0 ? results[0] : {};
    return Team;
}
const deleteTeamById = async (TeamId) => {
    let [result, fields] = await connection.query(
        `DELETE FROM Team WHERE idteam = ?`, [TeamId]
    );
}
const updateTeamById = async (name, country, pictureTeam, members,idcalendar, TeamId) => {
    let [result, fields] = await connection.query(
        `UPDATE Team 
        SET name = ?,country =?, pictureTeam =?, membes = ?, idcalendar =?
        WHERE idTeam = ?`
        , [name, country, pictureTeam, members,idcalendar, TeamId]
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
const deleteCalendarbyId = async (CalendarId) => {
    let [result, fields] = await connection.query(
        `DELETE FROM Calendar WHERE idcalendar = ?`, [CalendarId]
    );
}
const updateCalendarById = async (address,dates , times, CalendarId) => {
    let [result, fields] = await connection.query(
        `UPDATE Calendar 
        SET address = ?,dates =?, times =?
        WHERE idcalendar = ?`
        , [address,dates , times,  CalendarId]
    );
}

//data results
const getAllResults = async () => {
    let [results, fields] = await connection.query('select * from Results');
    return results;
}
const getResultbyId = async (ResultsId) => {
    let [results, fields] = await connection.query('SELECT * FROM Results WHERE idresult =?', [ResultsId]);
    let Results = results && results.length > 0 ? results[0] : {};
    return Results;
}
const deleteResultsbyId = async (ResultsId) => {
    let [result, fields] = await connection.query(
        `DELETE FROM Results WHERE idresult = ?`, [ResultsId]
    );
}
const updateResultById = async (standing, points, idrider, ResultsId) => {
    let [result, fields] = await connection.query(
        `UPDATE Results 
        SET standing = ?,points =?, idrider =? 
        WHERE idresult = ?`
        , [standing, points, idrider, ResultsId]
    );
}
module.exports = {
    updateResultById,updateCalendarById,updateTeamById,deleteResultsbyId, getResultbyId, deleteCalendarbyId, getAllRider, getTeambyId, getRiderbyId, deleteTeamById, updateRiderById, deleteRiderById, getAllTeam, getAllCalendar, getAllResults, getCalendarbyId
}