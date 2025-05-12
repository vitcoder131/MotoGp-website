const express = require('express');
const { postHandleUploadFile,  getRiderpage, postCreateRider, postUpdateRider, getCreateRider, getUpdateRider, postDeleteRider, postHandleRemoveRider, getResultspage, postCreateResults, postUpdateResults, getCreateResults, getUpdateResults, postDeleteResults, postHandleRemoveResults, getTeampage, postCreateTeam, postUpdateTeam, getCreateTeam, getUpdateTeam, postDeleteTeam,postHandleRemoveTeam,
    getCalendarpage, postCreateCalendar, postUpdateCalendar, getCreateCalendar, getUpdateCalendar, postDeleteCalendar, postHandleRemoveCalendar } = require('../controllers/homeController')
const router = express.Router();
const multer = require('multer');
const path = require('path');
var appRoot = require('app-root-path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/images/");
    },

    filename: function (req, file, cb) {
        const fname = req.body.name;
        cb(null, fname  + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });


//upload motoGp
router.post('/upload-profile-pic', upload.single('profile-pic'), postHandleUploadFile);
//router.get('/upload-rider', getUploadfile);


//rider
router.get('/', getRiderpage);
router.post('/create-rider', upload.single('pictureId'), postCreateRider);
router.post('/update-rider', postUpdateRider);
router.get('/createR', getCreateRider);
router.get('/updateR/:id', getUpdateRider);
router.post('/delete-rider/:id', postDeleteRider);
router.post('/delete-rider', postHandleRemoveRider);

//result
router.get('/results', getResultspage);
router.post('/create-result', postCreateResults);
router.post('/update-result', postUpdateResults);
router.get('/createS', getCreateResults);
router.get('/updateS/:id', getUpdateResults);
router.post('/delete-result/:id', postDeleteResults);
router.post('/delete-result', postHandleRemoveResults);
//team
router.get('/team', getTeampage);
router.post('/create-team', postCreateTeam);
router.post('/update-team', postUpdateTeam);
router.get('/createT', getCreateTeam);
router.get('/updateT/:id', getUpdateTeam);
router.post('/delete-Team/:id', postDeleteTeam);
router.post('/delete-Team', postHandleRemoveTeam);

//calendar
router.get('/calendar', getCalendarpage);
router.post('/create-calendar', postCreateCalendar);
router.post('/update-calendar', postUpdateCalendar);
router.get('/createC', getCreateCalendar);
router.get('/updateC/:id', getUpdateCalendar);
router.post('/delete-calendar/:id', postDeleteCalendar);
router.post('/delete-calendar', postHandleRemoveCalendar);





module.exports = router;
