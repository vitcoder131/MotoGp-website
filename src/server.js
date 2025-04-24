require('dotenv').config();
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const app = express()
const port = process.env.PORT || 8888; //=>hardcode khai pỏrt cứng
const hostname =process.env.HOST_NAME;
const webRoutes =require('./routes/web');
const connection = require('./config/database');


//config static file

//khai bao template ejs
configViewEngine(app);

//khai bao route
app.use('/',webRoutes);

//test connection
connection.query(
    'select * from Users u ',
    function(err,results,fields){
        console.log(" ==> results = ", results);
    }
)


app.listen(port,hostname, () => {
    console.log(`Example app listening on port ${port}`)
})