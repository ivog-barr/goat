const express = require('express');
const { productPost, productDelete, productPut, productGet } = require('../controllers/productController');
const { validarCampos } = require('../middlewares/validarCampos');
const { body, check } = require('express-validator');
const { existeProducto } = require('../helpers/existeProducto');
const { validarJWT } = require('../middlewares/validar-jwt');
const { adminRole } = require('../middlewares/validar-roles');
const productRouter = express.Router();



productRouter.post('/',[
    body('name').notEmpty().withMessage('Nombre es obligatorio'),
    body('description').notEmpty().withMessage('Descripcion es obligatoria'),
    body('cantidad').isNumeric().withMessage(' tiene que ser un numero'),
    body('price').isNumeric().withMessage('Tiene que ser un numero'),
    validarCampos
],productPost);



productRouter.delete('/:id',[
    validarJWT,
    adminRole,
    check('id','No es un mongo ID Valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], productDelete);


productRouter.put('/:id',[
    check('id','No es un mongo ID Valido').isMongoId(),
    check('id').custom(existeProducto),
    body('cantidad').isNumeric().withMessage(' tiene que ser un numero'),
    body('price').isNumeric().withMessage('Tiene que ser un numero'),
    body('description').notEmpty().withMessage('Descripcion es obligatoria'),
    validarCampos
],productPut);




productRouter.get('/',productGet);






module.exports = {
    productRouter
}