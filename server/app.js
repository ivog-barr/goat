const express = require('express');
const { router } = require('./routes/user');
const cors = require('cors');
const { dbConnection } = require('./db/config');
const { authRouter } = require('./routes/auth');
const { productRouter } = require('./routes/product');

const app = express();

require('dotenv').config()

app.use(express.json());
app.use(cors())


//Conexion a base de datos:))))
dbConnection()

//Rutas de pana
app.use('/user',router );
app.use('/auth',authRouter);
app.use('/product',productRouter);

app.listen(4000, ()=>{
    console.log("Server running on port 4000");
});