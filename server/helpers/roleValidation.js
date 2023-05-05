const {Role} = require('../models/role');


const roleValidation =  async(role="")=>{
    const existeRole = await Role.findOne({role});
    if(!existeRole){
        throw new Error(`El rol ${role} no esta registrado en la BDD`)
    }
};



module.exports = {
    roleValidation
}