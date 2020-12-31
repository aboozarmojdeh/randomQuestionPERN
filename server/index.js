const express=require('express');
const cors=require('cors');
const pool=require('./database');

const app=express();

app.use(express.json());
app.use(cors());


// Routes

app.use('/api/v1/questions',require("./routes/questions"))


app.listen(5000,()=>{
    console.log('Server is listening to PORT 5000')
})