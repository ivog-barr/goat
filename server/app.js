const express = require('express');
const { router } = require('./routes/user');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())


app.use('/user',router );

app.listen(4000, ()=>{
    console.log("Server running on port 4000");
});