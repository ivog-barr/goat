const express = require('express');
const { userGet, userPost, userDelete, userPatch, userPut } = require('../controllers/userController');
const router = express.Router();
const {check} = require('express-validator');


router.get('/',userGet );

router.post('/',[
    check('email',"El correo no es valido").isEmail(),
    check('name','El nombre es obligatorio').notEmpty(),
    check('pwd','Contrasena mas de 6 letras').isLength({min:6}),
],userPost);

router.delete('/',userDelete);

router.patch('/',userPatch);

router.put('/:id',userPut);



module.exports ={
    router
}