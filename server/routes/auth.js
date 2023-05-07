const express = require('express');
const { loginController } = require('../controllers/authController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const authRouter = express.Router();




authRouter.post('/',[
    check('email','Formato de correo incorrecto').isEmail(),
    check('pwd','Contrasena mas de 6 letras').isLength({min:6}),
    validarCampos
],loginController);



module.exports = {
    authRouter
}


