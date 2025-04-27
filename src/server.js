require('dotenv').config();
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const app = express()
const port = process.env.PORT || 8888; //=>hardcode khai pỏrt cứng
const hostname =process.env.HOST_NAME;
const webRoutes =require('./routes/web');
const connection = require('./config/database');
const methodOverride = require('method-override');
const multer = require('multer');
const path = require('path');

//api
const initApiRoute = require ('./routes/api');

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//config static file

//khai bao template ejs
configViewEngine(app);

//initapi
initApiRoute(app);

//khai bao route
app.use('/',webRoutes);

//test connection



app.listen(port,hostname, () => {
    console.log(`Example app listening on port ${port}`)
})