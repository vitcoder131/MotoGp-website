const connection = require('../config/database');
const { getAllRider, getRiderbyId, updateRiderById, deleteRiderById } = require('../services/CRUDService');
const multer = require('multer');


const getHomepage = async (req, res) => {

    // let results = await getAllRider();
    // return res.render('home.ejs', { listRiders: results })
}
const getRiderpage = async (req , res ) => {
    let results = await getAllRider();
    return res.render('home.ejs', { listUsers: results })
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
    res.render('create.ejs');
}
const getUpdateRider = async (req, res) => {
    const RiderId = req.params.id;
    let Rider = await getRiderbyId(RiderId);
    res.render('edit.ejs', { RiderId: Rider });
}
const postDeleteRider = async (req, res) => {
    const RiderId = req.params.id;
    let Rider = await getRiderbyId(RiderId);
    res.render('delete.ejs', { RiderId: Rider });
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
// const getRiderpage = async (req, res) => {
    
// }

// const postCreateRider = async (req, res) => {
    
// }
// const postUpdateRider = async (req, res) => {
    
// }
// const getCreateRider = async (req, res) => {
    
// }
// const getUpdateRider = async (req, res) => {
    
// }
// const postDeleteRider = async (req, res) => {
    
// }
// const postHandleRemoveRider = async (req, res) => {
    
// }
const getTeampage = async (req, res) => {
    
}
const postCreateTeam = async (req, res) => {
    
}
const postUpdateTeam = async (req, res) => {
    
}
const getCreateTeam = async (req, res) => {
    
}
const getUpdateTeam = async (req, res) => {
    
}
const postDeleteTeam = async (req, res) => {
    
}
const postHandleRemoveTeam = async (req, res) => {
    
}
const getCalenderpage = async (req, res) => {
    
}
const postCreateCalender = async (req, res) => {
    
}
const postUpdateCalender = async (req, res) => {
    
}
const postDeleteCalender = async (req, res) => {
    
}
const getCreateCalender = async (req, res) => {
    
}
const getUpdateCalender = async (req, res) => {
    
}
const postHandleRemoveCalender = async (req, res) => {
    
}
const getResultspage = async (req, res) => {
    
}
const postCreateResults = async (req, res) => {
    
}
const postUpdateResults = async (req, res) => {
    
}
const postDeleteResults = async (req, res) => {
    
}
const getCreateResults = async (req, res) => {
    
}
const getUpdateResults = async (req, res) => {
    
}
const postHandleRemoveResults = async (req, res) => {
    
}



module.exports = {
    postHandleUploadFile, getUploadfile, getHomepage, getRiderpage, postCreateRider, postUpdateRider, getCreateRider, getUpdateRider, postDeleteRider, postHandleRemoveRider, getResultspage, postCreateResults, postUpdateResults, getCreateResults, getUpdateResults, postDeleteResults, postHandleRemoveResults, getTeampage, postCreateTeam, postUpdateTeam, getCreateTeam, getUpdateTeam, postDeleteTeam,postHandleRemoveTeam,
    getCalenderpage, postCreateCalender, postUpdateCalender, getCreateCalender, getUpdateCalender, postDeleteCalender, postHandleRemoveCalender 
}