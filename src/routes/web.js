const express = require('express');
const { postHandleUploadFile, getUploadfile, getHomepage, getRiderpage, postCreateRider, postUpdateRider, getCreateRider, getUpdateRider, postDeleteRider, postHandleRemoveRider, getResultspage, postCreateResults, postUpdateResults, getCreateResults, getUpdateResults, postDeleteResults, postHandleRemoveResults, getTeampage, postCreateTeam, postUpdateTeam, getCreateTeam, getUpdateTeam, postDeleteTeam,postHandleRemoveTeam,
    getCalenderpage, postCreateCalender, postUpdateCalender, getCreateCalender, getUpdateCalender, postDeleteCalender, postHandleRemoveCalender } = require('../controllers/homeController')
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
router.get('/upload-rider', getUploadfile);


//home
router.get('/ride', getHomepage);


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
router.post('/creat-Results', postCreateResults);
router.post('/update-Results', postUpdateResults);
router.get('/creatS', getCreateResults);
router.get('/updateS/:id', getUpdateResults);
router.post('/delete-Results/:id', postDeleteResults);
router.post('/delete-Results', postHandleRemoveResults);
//team
router.get('/team', getTeampage);
router.post('/creat-Team', postCreateTeam);
router.post('/update-Team', postUpdateTeam);
router.get('/creatT', getCreateTeam);
router.get('/updateT/:id', getUpdateTeam);
router.post('/delete-Team/:id', postDeleteTeam);
router.post('/delete-Team', postHandleRemoveTeam);

//calender
router.get('/calender', getCalenderpage);
router.post('/creat-Calender', postCreateCalender);
router.post('/update-Calender', postUpdateCalender);
router.get('/creatC', getCreateCalender);
router.get('/updateC/:id', getUpdateCalender);
router.post('/delete-Calender/:id', postDeleteCalender);
router.post('/delete-Calender', postHandleRemoveCalender);





module.exports = router;
