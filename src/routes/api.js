const express=  require( "express");
const ApiController =  require( '../controllers/ApiController');


let router = express.Router();

//route.method(, handle)

// rider
const initApiRider = (app) =>{
    router.get('/rider', ApiController.getAllRider); //method get ->read data
    router.post('/create-rider', ApiController.createNewRider); //method POST ->CREATE data
    router.put('/update-rider', ApiController.updateRider); //method put ->edit data
    router.delete('/delete-rider/:id', ApiController.deleteRider); //method delete ->delete data

    return app.use('/api/v1',router)
}

//team
const initApiTeam =(app) =>{



    return app.use('/team/v1', router)
}
//results
const initApiResults =(app) =>{


    
    return app.use('/results/v1', router)
}
//calendar
const initApiCalendar =(app) =>{


    
    return app.use('/calendar/v1', router)
}

module.exports = initApiRider, initApiCalendar, initApiResults, initApiTeam;
