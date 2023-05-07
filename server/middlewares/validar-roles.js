const { request, response } = require("express")




const adminRole = (req =request, res = response,next)=>{

    if(!req.user){
       return  res.status(500).json({
            msg:"Se necesita validar el token primero"
        });
    }

    const {name, role } = req.user;

    if(role !== 'ADMIN_ROLE'){
       return res.status(401).json({
            msg:`Usuario ${name} no es administrador - no puede realizar esta accion`
        });
    };

    next()

}



module.exports = {
    adminRole
}