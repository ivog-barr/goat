const express = require('express');
const { userGet, userPost, userDelete, userPatch, userPut } = require('../controllers/userController');
const router = express.Router();


router.get('/',userGet );

router.post('/',userPost);

router.delete('/',userDelete);

router.patch('/',userPatch);

router.put('/:id',userPut);



module.exports ={
    router
}