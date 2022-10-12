const { iniciarSesion } = require('../controllers/auth.controllers');

const router = require('express').Router();

router.post('/login', iniciarSesion )


module.exports = router;