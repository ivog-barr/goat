const {request, response} = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const userGet = (req = request,res = response)=>{
    const {q, nombre="no name",page=1, limit=1 } = req.query
 
    res.json({
        q,
        nombre,
        page,
        limit
    });
};

const userPost = async(req = request,res = response)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
    const {name,email,pwd} = req.body;
    const user = new User({name,email,pwd});
    //Verificar si existe el correo
    const existeEmail = await User.findOne({email});
    if(existeEmail){
        return res.status(400).json({
            msg:"Correo ya registrado en la base de datos"
        })
    }


    //Encriptar la constrasena
    const salt = bcrypt.genSaltSync();
    user.pwd = bcrypt.hashSync(pwd, salt);
    await user.save()
    res.json(
        user
    );
};

const userDelete = (req = request,res = response)=>{
   
    res.json({
        msg :"DELETE API"
    });
};

const userPut = (req = request,res = response)=>{
   const {id} = req.params
    res.json({
        msg :"PUT API",
        id
    });
};

const userPatch = (req = request,res = response)=>{
   
    res.json({
        msg:"PATCH API"
    });
};









module.exports ={
    userGet,
    userDelete,
    userPatch,
    userPost,
    userPut
}