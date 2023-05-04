const {request, response} = require('express')

const userGet = (req = request,res = response)=>{
    const {q, nombre="no name",page=1, limit=1 } = req.query
 
    res.json({
        q,
        nombre,
        page,
        limit
    });
};

const userPost = (req = request,res = response)=>{
    const body = req.body
    res.json(body);
};

const userDelete = (req = request,res = response)=>{
   
    res.json({
        msg :"DELETE API"
    });
};

const userPut = (req = request,res = response)=>{
   const {id} = req.params
    res.json({
        msg :"PUT API",
        id
    });
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