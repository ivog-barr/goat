const { Product } = require("../models/producto");





const existeProducto = async(id)=> {
    const producto = await Product.findById(id);
    if(!producto){
         throw new Error(`El producto con el id ${id} no existe`);
    }

}


module.exports = {
 existeProducto
}