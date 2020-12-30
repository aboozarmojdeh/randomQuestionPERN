const express=require('express');
const cors=require('cors');
const pool=require('./database');

const app=express();

app.use(express.json());
app.use(cors());

// Get all questions
app.get('/questions',async (req,res)=>{
    try {
      const allQuestions=await pool.query('SELECT * FROM question');
      res.json(allQuestions.rows)  
    } catch (err) {
        console.error(err.message)
    }
});

// Get a questions
app.get('/questions/:id',async (req,res)=>{
    try {
        const {id}=req.params;
      const aQuestion=await pool.query('SELECT * FROM question WHERE question_id=$1',[id]);
      res.json(aQuestion.rows[0])  
    } catch (err) {
        console.error(err.message)
    }
});

// create a questions
app.post('/questions',async (req,res)=>{
    try {
        const {id}=req.params;
        const {question_text,answer_text}=req.body;
      const newQuestion=await pool.query('INSERT INTO question (question_text,answer_text) VALUES($1,$2) RETURNING *',[question_text,answer_text]);
      res.json(newQuestion.rows[0])  
    } catch (err) {
        console.error(err.message)
    }
});

app.listen(5000,()=>{
    console.log('Server is listening to PORT 5000')
})