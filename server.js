
const express = require('express');
const app = express();
const PORT=9876;

const bodyParser = require('body-parser');
const router= require('./router/router');
const mongodb= require('./db/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/user',router);
app.listen(PORT,()=>{

console.log(`server is start is ${PORT}`);
    
})