const express=  require( "express");
const ApiController =  require( '../controllers/ApiController');


let router = express.Router();

//route.method(, handle)
const initApiRoute = (app) =>{
    router.get('/rider', ApiController.getAllRider); //method get ->read data
    router.post('/create-rider', ApiController.createNewRider); //method POST ->CREATE data
    router.put('/update-rider', ApiController.updateRider); //method put ->edit data
    router.delete('/delete-rider/:id', ApiController.deleteRider); //method delete ->delete data

    return app.use('/api/v1',router)
}

module.exports = initApiRoute;
