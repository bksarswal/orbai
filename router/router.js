const express = require('express');

const router= express.Router();
const controller= require('../controller/controller');

router.get('/user-ragistation',controller.ragistation);
router.post('/user-login',controller.login);



module.exports= router;