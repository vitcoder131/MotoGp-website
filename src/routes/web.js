const express = require('express');
const{getHomepage, getAbc, getalo, postCreateUser,getCreatePage,
    postHandleRemoveUser,getUploadfile,
    getUpdatePage, postUpdateUser, postDeleteUser, postHandleUploadFile} = require('../controllers/homeController')
const router = express.Router();
const multer = require('multer');
const path = require('path');
var appRoot = require('app-root-path');
//route.method(, handle)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/images/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });



router.get('/', getHomepage);

router.get('/abc', getAbc)
router.get('/bao', getalo)
router.post('/creat-user', postCreateUser);

router.post('/update-user', postUpdateUser);
router.get('/creat', getCreatePage);
router.get('/update/:id', getUpdatePage);
router.post('/delete-user/:id', postDeleteUser);
router.post('/delete-user', postHandleRemoveUser);
router.get('/upload',getUploadfile);

router.post('/upload-profile-pic',upload.single('profile-pic'), postHandleUploadFile);
module.exports = router;
