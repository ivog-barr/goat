const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const productSchema = new Schema({

    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    
    cantidad:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },

    agotado:{
        type:Boolean,
        default:false
    }

});


const Product  = mongoose.model('Product',productSchema);


module.exports = {
    Product
}