const {request, response} = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');


const userGet = async(req = request,res = response)=>{
    const {desde=0, limit=5 } = req.query;

    const [total,usuarios] = await Promise.all([
        User.countDocuments({state:true}),

        User.find({state:true})
            .skip(Number(desde))
            .limit(Number(limit))

       
        
    ]);
    res.json({
        total,
        usuarios
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



const userDelete = async (req = request,res = response)=>{
   const {id} = req.params
   const authUser = req.user;

   const updatedUser = await User.findByIdAndUpdate(id,{state:false},{new:true})
    res.json({
        updatedUser,
        authUser
    })
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

module.exports ={
    userGet,
    userDelete,
    userPost,
    userPut
}