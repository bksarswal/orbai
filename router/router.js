const express = require('express');

const router= express.Router();
const controller= require('../controller/controller');

router.get('/user-ragistation',controller.ragistation);



module.exports= router;