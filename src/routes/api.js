const express=  require( "express");
const ApiController =  require( '../controllers/ApiController');


let router = express.Router();

//route.method(, handle)
const initApiRoute = (app) =>{
    router.get('/users', ApiController.getAllUsers); //method get ->read data
    router.post('/create-user', ApiController.createNewUser); //method POST ->CREATE data
    router.put('/update-user', ApiController.updateUser); //method put ->edit data
    router.delete('/delete-user/:id', ApiController.deleteUser); //method delete ->delete data

    return app.use('/api/v1',router)
}

module.exports = initApiRoute;
