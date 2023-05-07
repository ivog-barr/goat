const {request, response} = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/generar-jwt');

const loginController =async(req=request,  res=response)=>{
    const {email,pwd} = req.body;

    try {
        //Verificar si correo existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - correo"
            });
        };
        //Verificar si usuario se encuentra desactivado
        if(user.state ===false){
            return res.status(400).json({
                msg:"Usuario se encuentra desactivado"
            });

        };

     

        //Verificar si contrasena es correcta
        const pwdValid = bcrypt.compareSync(pwd, user.pwd);
        if(!pwdValid){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - password"
            });

        }

        const token = await generarJWT(user.id)

        res.json({
            email,
            pwd,
            token
        })
        
    } catch (error) {


        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        })
        
    }
   


};


module.exports = {
    loginController
}