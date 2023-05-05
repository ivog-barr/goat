const { User } = require("../models/user");



const existeUsuarioId = async(id)=> {
    const existeUsuario = await User.findById(id);
    if(!existeUsuario){
         throw new Error(`El usuario con el id ${id} no existe`);
    }

}


module.exports = {
    existeUsuarioId
}