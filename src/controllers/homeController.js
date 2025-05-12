const connection = require('../config/database');
const {updateResultById,updateCalendarById,updateTeamById,deleteResultsbyId,getResultbyId,deleteCalendarbyId, getCalendarbyId,getAllRider, getRiderbyId, updateRiderById, deleteRiderById , getAllTeam, getAllCalendar, getAllResults, deleteTeamById, getTeambyId } = require('../services/CRUDService');
const multer = require('multer');

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
    let pictureId = req.file.filename;
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
// let getUploadfile = async (req, res) => {
//     return res.render('uploadfile.ejs')
// }

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
    let name = req.body.name;
    let country = req.body.country;
    let pictureTeam = req.file.filename;
    let members = req.body.members;
    let idcalendar = req.body.idcalendar;

    console.log('name =', name, 'pictureTeam =', pictureTeam, 'country =', country, 'membes =',  members, 'idcalendar=', idcalendar);
    
    let [result, fields] = await connection.query(
        ` INSERT INTO Team( name, pictureTeam, country, membes, idcalendar )  VALUES (?, ?, ?, ?, ?)`, [name, pictureTeam, country,members, idcalendar]
    );
    console.log("check", result);
    res.send('Create team succeed !')
}
const postUpdateTeam = async (req, res) => {
    let country = req.body.country;
    let name = req.body.name;
    let pictureTeam = req.file.filename;
    let members = req.body.members;
    let idcalendar = req.body.idcalendar;

    await updateTeamById(name, country, pictureTeam, members,idcalendar)
    res.redirect('/team');
}
const getCreateTeam = async (req, res) => {
    res.render('create.ejs' , {type: 'team'});
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
    let address = req.body.address;
    let dates = req.body.dates;
    let times = req.body.times;

    console.log('address =', address, 'dates =', dates, 'times =', times);
    
    let [result, fields] = await connection.query(
        ` INSERT INTO Calendar( address, dates, times )  VALUES (?, ?, ?)`, [address, dates, times]
    );
    console.log("check", result);
    res.send('Create calendar succeed !')
}
const postUpdateCalendar = async (req, res) => {
    let address = req.body.address;
    let dates = req.body.dates;
    let times = req.body.times;

    await updateCalendarById(address,dates , times)
    res.redirect('/calendar');
}
const postDeleteCalendar = async (req, res) => {
    let CalendarId =req.params.id;
    let Calendar = await getCalendarbyId(CalendarId);
    res.render('delete.ejs' , { CalendarId : Calendar, type : 'calendar'});
}
const getCreateCalendar = async (req, res) => {
    res.render('create.ejs' , {type: 'calendar'});
}
const getUpdateCalendar = async (req, res) => {
    const CalendarId = req.params.id;
    let Calendar = await getCalendarbyId(CalendarId);
    res.render('edit.ejs', { CalendarId: Calendar , type: 'calendar'});
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
    let standing = req.body.standing;
    let points = req.body.points;
    let idrider = req.body.idrider;

    console.log('standing =', standing, 'points =', points, 'idrider =', idrider);
    
    let [result, fields] = await connection.query(
        ` INSERT INTO Results( standing, points, idrider )  VALUES (?, ?, ?)`, [standing, points, idrider]
    );
    console.log("check", result);
    res.send('Create result succeed !')
}
const postUpdateResults = async (req, res) => {
    let standing = req.body.standing;
    let points = req.body.points;
    let idrider = req.body.idrider;

    await updateResultById(standing, points, idrider)
    res.redirect('/results');
}
const postDeleteResults = async (req, res) => {
    let ResultsId =req.params.id;
    let Results = await getResultbyId(ResultsId);
    res.render('delete.ejs' , {type : 'results' , ResultsId : Results});
}
const getCreateResults = async (req, res) => {
    res.render('create.ejs' , {type: 'results'});
}
const getUpdateResults = async (req, res) => {
    const ResultsId = req.params.id;
    let Result = await getResultbyId(ResultsId);
    res.render('edit.ejs', { ResultsId: Result , type: 'results'});
}
const postHandleRemoveResults = async (req, res) => {
    const ResultsId = req.body.ResultsId;
    await deleteResultsbyId(ResultsId);
    res.redirect('/results')
}



module.exports = {
    postHandleUploadFile, getRiderpage, postCreateRider, postUpdateRider, getCreateRider, getUpdateRider, postDeleteRider, postHandleRemoveRider, getResultspage, postCreateResults, postUpdateResults, getCreateResults, getUpdateResults, postDeleteResults, postHandleRemoveResults, getTeampage, postCreateTeam, postUpdateTeam, getCreateTeam, getUpdateTeam, postDeleteTeam,postHandleRemoveTeam,
    getCalendarpage, postCreateCalendar, postUpdateCalendar, getCreateCalendar, getUpdateCalendar, postDeleteCalendar, postHandleRemoveCalendar 
}