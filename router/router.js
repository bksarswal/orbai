const express = require('express');

const router= express.Router();
const controller= require('../controller/controller');

router.get('/user-ragistation',controller.ragistation);
router.post('/user-login',controller.login);
router.post('/user-update',controller.updatePhone);
router.post('/user-reset-password',controller.resetPassword);



module.exports= router;