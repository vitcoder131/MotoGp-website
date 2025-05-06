const connection = require('../config/database');
const {deleteResultsbyId,getResultsbyId,deleteCalendarbyId, getCalendarbyId,getAllRider, getRiderbyId, updateRiderById, deleteRiderById , getAllTeam, getAllCalendar, getAllResults, deleteTeamById, getTeambyId } = require('../services/CRUDService');
const multer = require('multer');


const getHomepage = async (req, res) => {

    // let results = await getAllRider();
    // return res.render('home.ejs', { listRiders: results })
}
const getRiderpage = async (req , res ) => {
    let results = await getAllRider();
    return res.render('home.ejs' , {type: 'rider', listUsers : results});
}
const postCreateRider = async (req, res) => {
    let name = req.body.name;
    let idteam = req.body.idteam;
    let pictureId = req.file.filename;
    let points = req.body.points;

    console.log('name =', name, 'pictureId =', pictureId, 'idteam =', idteam, 'points =',  points);
    
    let [result, fields] = await connection.query(
        ` INSERT INTO Rider( name, pictureId, idteam, points )  VALUES (?, ?, ?, ?)`, [name, pictureId, idteam,points]
    );
    console.log("check", result);
    res.send('Create use succeed !')
}
const postUpdateRider = async (req, res) => {
    let points = req.body.points;
    let name = req.body.name;
    let pictureId = req.body.pictureId;
    let idteam = req.body.idteam;

    await updateRiderById(name, pictureId, idteam,points)
    res.redirect('/');
}
const getCreateRider = (req, res) => {
    res.render('create.ejs' , {type: 'rider'});
}
const getUpdateRider = async (req, res) => {
    const RiderId = req.params.id;
    let Rider = await getRiderbyId(RiderId);
    res.render('edit.ejs', { RiderId: Rider , type: 'rider'});
}
const postDeleteRider = async (req, res) => {
    const RiderId = req.params.id;
    let Rider = await getRiderbyId(RiderId);
    res.render('delete.ejs', { RiderId: Rider ,  type: 'rider'});
}
const postHandleRemoveRider = async (req, res) => {
    const RiderId = req.body.RiderId;
    await deleteRiderById(RiderId);
    res.redirect('/')
}

//upload file
let getUploadfile = async (req, res) => {
    return res.render('uploadfile.ejs')
}

const upload = multer().single('profile-pic');
let postHandleUploadFile = async (req, res) => {
    console.log(req.file)
    upload(req, res, function(err){
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    else if(err instanceof multer.MulterError){
        return res.send(err);
    }
    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

const getTeampage = async (req, res) => {
    let results = await getAllTeam();
    return res.render('home.ejs' , {type: 'team', listUsers : results});
    
}
const postCreateTeam = async (req, res) => {
    
}
const postUpdateTeam = async (req, res) => {
    let country = req.body.country;
    let name = req.body.name;
    let pictureTeam = req.body.pictureTeam;
    let memebes = req.body.memebes;
    let idcalendar = req.body.idcalendar;

    await updateTeamById(name, country, pictureTeam, membes,idcalendar)
    res.redirect('/team');
}
const getCreateTeam = async (req, res) => {
    
}
const getUpdateTeam = async (req, res) => {
    const TeamId = req.params.id;
    let Team = await getTeambyId(TeamId);
    res.render('edit.ejs', { TeamId: Team , type: 'team'});
}
const postDeleteTeam = async (req, res) => {
    const TeamId = req.params.id;
    let Team = await getTeambyId(TeamId);
    res.render('delete.ejs', { TeamId: Team ,  type: 'team'});
}
const postHandleRemoveTeam = async (req, res) => {
    const TeamId = req.body.TeamId;
    await deleteTeamById(TeamId);
    res.redirect('/team')
}


const getCalendarpage = async (req, res) => {
    let results = await getAllCalendar();
    return res.render('home.ejs' , {type: 'calendar', listUsers : results});
    
}
const postCreateCalendar = async (req, res) => {
    
}
const postUpdateCalendar = async (req, res) => {
    
}
const postDeleteCalendar = async (req, res) => {
    let CalendarId =req.params.id;
    let Calendar = await getCalendarbyId(CalendarId);
    res.render('delete.ejs' , { CalendarId : Calendar, type : 'calendar'});
}
const getCreateCalendar = async (req, res) => {
    
}
const getUpdateCalendar = async (req, res) => {
    
}
const postHandleRemoveCalendar = async (req, res) => {
    const CalendarId = req.body.CalendarId;
    await deleteCalendarbyId(CalendarId);
    res.redirect('/calendar')
}
const getResultspage = async (req, res) => {
    let results = await getAllResults();
    return res.render('home.ejs' , {type: 'results', listUsers : results});
}
const postCreateResults = async (req, res) => {
    
}
const postUpdateResults = async (req, res) => {
    
}
const postDeleteResults = async (req, res) => {
    let ResultsId =req.params.id;
    let Results = await getResultsbyId(ResultsId);
    res.render('delete.ejs' , {type : 'results' , ResultsId : Results});
}
const getCreateResults = async (req, res) => {
    
}
const getUpdateResults = async (req, res) => {
    
}
const postHandleRemoveResults = async (req, res) => {
    const ResultsId = req.body.ResultsId;
    await deleteResultsbyId(ResultsId);
    res.redirect('/results')
}



module.exports = {
    postHandleUploadFile, getUploadfile, getHomepage, getRiderpage, postCreateRider, postUpdateRider, getCreateRider, getUpdateRider, postDeleteRider, postHandleRemoveRider, getResultspage, postCreateResults, postUpdateResults, getCreateResults, getUpdateResults, postDeleteResults, postHandleRemoveResults, getTeampage, postCreateTeam, postUpdateTeam, getCreateTeam, getUpdateTeam, postDeleteTeam,postHandleRemoveTeam,
    getCalendarpage, postCreateCalendar, postUpdateCalendar, getCreateCalendar, getUpdateCalendar, postDeleteCalendar, postHandleRemoveCalendar 
}