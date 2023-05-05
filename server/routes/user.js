const express = require('express');
const { userGet, userPost, userDelete, userPatch, userPut } = require('../controllers/userController');
const router = express.Router();
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { roleValidation } = require('../helpers/roleValidation');
const { emailExiste } = require('../helpers/emailExiste');
const { existeUsuarioId } = require('../helpers/existeUsuarioId');




router.get('/',userGet );

router.post('/',[
    check('email',"El correo no es valido").isEmail(),
    check('name','El nombre es obligatorio').notEmpty(),
    check('pwd','Contrasena mas de 6 letras').isLength({min:6}),
    check('role').custom(roleValidation),
    check('email').custom(emailExiste),
    validarCampos,
],userPost);

router.delete('/',userDelete);

router.patch('/',userPatch);

router.put('/:id',[
    check('id','No es un mongo ID Valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
],userPut);



module.exports ={
    router
}