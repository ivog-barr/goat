const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const roleSchema = new Schema ({
    role:{
        type:String,
        required:[true,"El rol es obligatorio"]
    }
});


const Role = mongoose.model('Role',roleSchema);

module.exports = {
    Role
}
