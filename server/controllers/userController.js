const {request, response} = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');


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

  
    const {name,email,pwd,role} = req.body;
    const user = new User({name,email,pwd,role});
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




const userPut = async(req = request,res = response)=>{
   const {id} = req.params
   const {_id,pwd, ...resto} = req.body;

   if(pwd){
    const salt = bcrypt.genSaltSync();
    resto.pwd = bcrypt.hashSync(pwd, salt);
   }

   const user = await User.findByIdAndUpdate(id,resto);
   await user.save();

    res.json(user);
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