const connection = require('../config/database');
const { getSearchByName,getSeason,getResults,updateResultById, updateCalendarById, updateTeamById, deleteResultsbyId, getResultbyId, deleteCalendarbyId, getCalendarbyId, getAllRider, getRiderbyId, updateRiderById, deleteRiderById, getAllTeam, getAllCalendar, getAllResults, deleteTeamById, getTeambyId } = require('../services/CRUDService');
const multer = require('multer');

const getRiderpage = async (req, res) => {
    let results = await getAllRider();
    return res.render('home.ejs', { type: 'rider', listUsers: results });
}
const postCreateRider = async (req, res) => {
    let name = req.body.name;
    let idteam = req.body.idteam;
    let pictureId = req.file.filename;
    let points = req.body.points;

    let season = req.body.season;
    let victory = req.body.victory;
    let podium = req.body.podium;
    let race = req.body.race;
    let poles = req.body.poles;
    let worldchampionships = req.body.worldchampionships;

    console.log('name =', name, 'pictureId =', pictureId, 'idteam =', idteam, 'points =', points, 'season =', season, 'victory =', victory, 'podium=', podium, 'race =', race, 'poles =', poles, 'worldchampionships=', worldchampionships);

    let [result, fields] = await connection.query(
        ` INSERT INTO Rider( name, pictureId, idteam, points, season,victory,podium,race,poles,worldchampionships )  VALUES (?,?,?,?,?,?,?, ?, ?, ?)`, [name, pictureId, idteam, points, season, victory, podium, race, poles, worldchampionships]
    );
    console.log("check", result);
    res.redirect('/rider');
}
const postUpdateRider = async (req, res) => {
    let RiderId = req.body.RiderId;
    let name = req.body.name;
    let pictureId = req.file.filename;
    let idteam = req.body.idteam;
    let points = req.body.points;
    let season = req.body.season;
    let victory = req.body.victory;
    let podium = req.body.podium;
    let race = req.body.race;
    let poles = req.body.poles;
    let worldchampionships = req.body.worldchampionships;

    await updateRiderById(name, pictureId, idteam, points, season, victory, podium, race, poles, worldchampionships, RiderId)
    res.redirect('/rider');
}
const getCreateRider = (req, res) => {
    res.render('create.ejs', { type: 'rider' });
}
const getUpdateRider = async (req, res) => {
    const RiderId = req.params.id;
    let Rider = await getRiderbyId(RiderId);
    res.render('edit.ejs', { RiderId: Rider, type: 'rider' });
}
const postDeleteRider = async (req, res) => {
    const RiderId = req.params.id;
    let Rider = await getRiderbyId(RiderId);
    res.render('delete.ejs', { RiderId: Rider, type: 'rider' });
}
const postHandleRemoveRider = async (req, res) => {
    const RiderId = req.body.RiderId;
    await deleteRiderById(RiderId);
    res.redirect('/rider')
}

const upload = multer().single('profile-pic');
let postHandleUploadFile = async (req, res) => {
    console.log(req.file)
    upload(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

const getTeampage = async (req, res) => {
    let results = await getAllTeam();
    return res.render('home.ejs', { type: 'team', listUsers: results });

}
const postCreateTeam = async (req, res) => {

    let name = req.body.name;
    let country = req.body.country;
    let pictureTeam = req.file.filename;
    let members = req.body.members;
    let idcalendar = req.body.idcalendar;

    console.log('name =', name, 'pictureTeam =', pictureTeam, 'country =', country, 'membes =', members, 'idcalendar=', idcalendar);

    let [result, fields] = await connection.query(
        ` INSERT INTO Team( name, pictureTeam, country, membes, idcalendar )  VALUES (?, ?, ?, ?, ?)`, [name, pictureTeam, country, members, idcalendar]
    );
    console.log("check", result);
    res.redirect('/team');
}
const postUpdateTeam = async (req, res) => {
    console.log("DEBUG req.body:", req.body);
    let TeamId = req.body.TeamId;
    let country = req.body.country;
    let name = req.body.name;
    let pictureTeam = req.file.filename;
    let members = req.body.members;
    let idcalendar = req.body.idcalendar;

    await updateTeamById(name, country, pictureTeam, members, idcalendar, TeamId)
    res.redirect('/team');
}
const getCreateTeam = async (req, res) => {
    res.render('create.ejs', { type: 'team' });
}
const getUpdateTeam = async (req, res) => {
    const TeamId = req.params.id;
    let Team = await getTeambyId(TeamId);
    res.render('edit.ejs', { TeamId: Team, type: 'team' });
}
const postDeleteTeam = async (req, res) => {
    const TeamId = req.params.id;
    let Team = await getTeambyId(TeamId);
    res.render('delete.ejs', { TeamId: Team, type: 'team' });
}
const postHandleRemoveTeam = async (req, res) => {
    const TeamId = req.body.TeamId;
    await deleteTeamById(TeamId);
    res.redirect('/team')
}


const getCalendarpage = async (req, res) => {
    let results = await getAllCalendar();
    return res.render('home.ejs', { type: 'calendar', listUsers: results });

}
const postCreateCalendar = async (req, res) => {
    let address = req.body.address;
    let dates = req.body.dates;
    let times = req.body.times;
    let season = req.body.season;
    let rounds = req.body.rounds;
    let calendar_name = req.body.calendar_name;
    let pictureCountry = req.file.filename;
    

    console.log('address =', address, 'dates =', dates, 'times =', times, 'season =', season, 'rounds =', rounds, 'calendar_name =', calendar_name, 'pictureCountry= ', pictureCountry);

    let [result, fields] = await connection.query(
        ` INSERT INTO Calendar( address, dates, times, season,rounds,calendar_name )  VALUES (?, ?, ?,?,?,?, ?)`, [address, dates, times, season, rounds, calendar_name, pictureCountry]
    );
    console.log("check", result);
    res.redirect('/calendar');
}
const postUpdateCalendar = async (req, res) => {
    console.log("DEBUG req.body:", req.body);
    let CalendarId = req.body.CalendarId;
    let address = req.body.address;
    let dates = req.body.dates;
    let times = req.body.times;
    let season = req.body.season;
    let rounds = req.body.rounds;
    let calendar_name = req.body.calendar_name;
    let pictureCountry = req.file.filename;

    await updateCalendarById(address, dates, times, season, rounds, calendar_name,pictureCountry, CalendarId)
    res.redirect('/calendar');
}
const postDeleteCalendar = async (req, res) => {
    let CalendarId = req.params.id;
    let Calendar = await getCalendarbyId(CalendarId);
    res.render('delete.ejs', { CalendarId: Calendar, type: 'calendar' });
}
const getCreateCalendar = async (req, res) => {
    res.render('create.ejs', { type: 'calendar' });
}
const getUpdateCalendar = async (req, res) => {
    const CalendarId = req.params.id;
    let Calendar = await getCalendarbyId(CalendarId);
    res.render('edit.ejs', { CalendarId: Calendar, type: 'calendar' });
}
const postHandleRemoveCalendar = async (req, res) => {
    const CalendarId = req.body.CalendarId;
    await deleteCalendarbyId(CalendarId);
    res.redirect('/calendar')
}
const getResultspage = async (req, res) => {
    let results = await getAllResults();
    return res.render('home.ejs', { type: 'results', listUsers: results });
}
const postCreateResults = async (req, res) => {
    let standing = req.body.standing;
    let points = req.body.points;
    let idrider = req.body.idrider;
    let idcalendar = req.body.idcalendar;
    let season = req.body.season;
    let mvp_name = req.body.mvp_name;
    let time_finish = req.body.time_finish;

    console.log('standing =', standing, 'points =', points, 'idrider =', idrider, 'idcalendar =', idcalendar, 'season =', season, 'mvp_name=', mvp_name, 'time_finish =', time_finish);

    let [result, fields] = await connection.query(
        ` INSERT INTO Results( standing, points, idrider,idcalendar, season,mvp_name,time_finish )  VALUES (?, ?, ?, ?,?,?,?)`, [standing, points, idrider, idcalendar, season, mvp_name, time_finish]
    );
    console.log("check", result);
    res.redirect('/results');
}
const postUpdateResults = async (req, res) => {
    console.log("DEBUG req.body:", req.body);
    let ResultsId = req.body.ResultsId;
    let standing = req.body.standing;
    let points = req.body.points;
    let idrider = req.body.idrider;
    let idcalendar = req.body.idcalendar;
    let season = req.body.season;
    let mvp_name = req.body.mvp_name;
    let time_finish = req.body.time_finish;
    await updateResultById(standing, points, idrider, idcalendar, season, mvp_name, time_finish, ResultsId)
    res.redirect('/results');
}
const postDeleteResults = async (req, res) => {
    let ResultsId = req.params.id;
    let Results = await getResultbyId(ResultsId);
    res.render('delete.ejs', { type: 'results', ResultsId: Results });
}
const getCreateResults = async (req, res) => {
    res.render('create.ejs', { type: 'results' });
}
const getUpdateResults = async (req, res) => {
    const ResultsId = req.params.id;
    let Result = await getResultbyId(ResultsId);
    res.render('edit.ejs', { ResultsId: Result, type: 'results' });
}
const postHandleRemoveResults = async (req, res) => {
    const ResultsId = req.body.ResultsId;
    await deleteResultsbyId(ResultsId);
    res.redirect('/results')
}

const getInforPage = async (req, res) => {
    res.render('show.ejs', { type: 'home' })
}
const getInforRiderPage = async (req, res) => {
    let results = await getAllRider();
    res.render('show.ejs', { type: 'rider', listUsers: results })
}
const getInforCalendarPage = async (req, res) => {
    let results = await getAllCalendar();

    res.render('show.ejs', { type: 'calendar', listUsers: results })
}
const getInforResultwithnametem = async (req, res) => {
    let results = await getResults();

    res.render('show.ejs', { type: 'result', listUsers: results })
}
const getInforStandingPage = async (req, res) => {
    let results = await getResults();

    res.render('show.ejs', { type: 'standing', listUsers: results })
}
const getInforRecordPage = async (req, res) => {
    let results = await getResults();

    res.render('show.ejs', { type: 'record', listUsers: results })
}
const getInforTeamPage = async (req, res) => {
    let results = await getAllTeam();

    res.render('show.ejs', { type: 'team', listUsers: results })
}
const getRider = async (req, res) => {
    const RiderId = req.params.id;
    let Rider = await getRiderbyId(RiderId);
    res.render('show-detail.ejs', { RiderId: Rider, type: 'rider' });
}
const getSearch = async (req, res) => {
    const search = req.body.search;
    let results = await getSearchByName(search);
    console.log(results, search),
    res.render('show.ejs', { search: results, type: 'rider' ,listUsers :[], searchValue : search });
}
const getTeam = async (req, res) => {
    const TeamId = req.params.id;
    let Team = await getTeambyId(TeamId);
    res.render('show-detail.ejs', { TeamId: Team, type: 'team' });
}
const getCalendar = async (req, res) => {
    const CalendarId = req.params.id;
    let Calendar = await getCalendarbyId(CalendarId);
    res.render('show-detail.ejs', { CalendarId: Calendar, type: 'calendar' });
}
module.exports = {
    getRider,getTeam,getCalendar, getSearch,
    getInforPage, getInforRiderPage, getInforTeamPage,
    getInforCalendarPage,
    getInforResultwithnametem,getInforStandingPage,
getInforRecordPage,
    postHandleUploadFile, getRiderpage, postCreateRider, postUpdateRider, getCreateRider, getUpdateRider, postDeleteRider, postHandleRemoveRider, getResultspage, postCreateResults, postUpdateResults, getCreateResults, getUpdateResults, postDeleteResults, postHandleRemoveResults, getTeampage, postCreateTeam, postUpdateTeam, getCreateTeam, getUpdateTeam, postDeleteTeam, postHandleRemoveTeam,
    getCalendarpage, postCreateCalendar, postUpdateCalendar, getCreateCalendar, getUpdateCalendar, postDeleteCalendar, postHandleRemoveCalendar
}