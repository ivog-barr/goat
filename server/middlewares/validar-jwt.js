const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');


const validarJWT =async(req =request, res = response, next)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    };

    try {

        const {uid} =  await jwt.verify(token, process.env.SECRETKEY);

        const authUser = await User.findById(uid);

        if(!authUser){
            return res.status(401).json({
                msg:"Token no  valido -- Usuario no existe en la bdd"
            });
        }

        if(!authUser.state){
            return res.status(401).json({
                msg:"Token no  valido -- Usuario Desactivado"
            });
        }
        req.user = authUser
        next();
        
    } catch (error) {
        console.log("Ocurrió un error en la validación del token:", error.message);
        res.status(401).json({
            msg:'Token no valido'
        });
        
    }

   


   

}



module.exports ={
    validarJWT
}