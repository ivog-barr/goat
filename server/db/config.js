const mongoose = require('mongoose');



const dbConnection = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log('Conectado a db con exito');
        
    } catch (error) {
        console.log(error)
        throw new Error('Error en la base de datos');
    }

}







module.exports= {
    dbConnection
}