const express = require('express');
const { router } = require('./routes/user');
const cors = require('cors');
const { dbConnection } = require('./db/config');

const app = express();

require('dotenv').config()

app.use(express.json());
app.use(cors())

dbConnection()


app.use('/user',router );

app.listen(4000, ()=>{
    console.log("Server running on port 4000");
});