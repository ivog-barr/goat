const { request, response } = require("express");
const { Product } = require("../models/producto");





const productGet =async(req=request, res=response)=>{

    const allProducts = await  Product.find({agotado:false});
    res.json({
        allProducts
    });
}



const productPost =async(req = request, res= response)=>{

    const {name, description,price ,cantidad} = req.body;
    const product = new Product({name,price,description,cantidad});

    await product.save();

    res.json({
        product
    })

};

const productPut = async (req=request, res=response)=>{
    const {id} = req.params;
    const {name,price,cantidad,description} = req.body;

    const product = await Product.findByIdAndUpdate(id,{name,price,cantidad,description},{new:true});

    if(product.cantidad > 0){
        product.agotado = false
    };

    await  product.save();
    res.json({
        msg:`Producto con id ${id} ha sido modificado satisfactoriamente`,
        product
    })
}



const productDelete = async(req=request, res=response)=>{
    const {id}= req.params;

    const product = await Product.findByIdAndUpdate(id, {agotado:true}, {new:true});
    product.cantidad = 0;
    await product.save();

    res.json({
        msg:`El producto con id ${id} ha sido modificado satisfactoriamente en la BDD`,
        product
    });
}





module.exports = {
    productPost,
    productDelete,
    productPut,
    productGet
}