const express = require('express');
const{getHomepage, getAbc, getalo, postCreateUser,getCreatePage,
    postHandleRemoveUser,
    getUpdatePage, postUpdateUser, postDeleteUser} = require('../controllers/homeController')
const router = express.Router();

//route.method(, handle)

router.get('/', getHomepage);

router.get('/abc', getAbc)
router.get('/bao', getalo)
router.post('/creat-user', postCreateUser);

router.post('/update-user', postUpdateUser);
router.get('/creat', getCreatePage);
router.get('/update/:id', getUpdatePage);
router.post('/delete-user/:id', postDeleteUser);
router.post('/delete-user', postHandleRemoveUser);
module.exports = router;
