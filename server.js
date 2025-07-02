const express = require('express');
const app= express();
const cors = require('cors');
const db = require('./db');
app.use(cors());
app.use(express.json());

const port = 3333;

//get api
app.get('/api/events',(req,res)=>{
db.query('SELECT * FROM events', (err, result)=>{
if(err)return res.status(500).send(err);
res.json(result);
});
});

//post
app.post('/api/events',(req,res)=>{
const { name , email , phone , event , location, message}= req.body;
db.query('INSERT INTO events (name , email , phone , event , location, message) VALUES (?,?,?,?,?,?)',[name , email , phone , event , location, message],(err,result)=>{
if(err)return res.status(500).send(err);
res.send({message:'event added successfully'});
});
});

//put 
app.put('/api/events/:id',(req,res)=>{
const {name , email , phone , event , location, message}=req.body;
const {id}=req.params;
db.query('UPDATE events SET name=?,email=?,phone=?,event=?,location=?,message=? WHERE id=?',[name , email , phone , event , location, message,id],(err)=>{
if(err)return res.status(500).send(err);
res.send({message:'event update successfully'});
});
});

//delete
app.delete('/api/events/:id',(req,res)=>{
const {id}=req.params;
db.query('DELETE FROM events WHERE id=?',[id],(err)=>{
    if(err) return res.status(500).send(err);
    res.send({message:'event delete successfully'});
})
});


app.listen(port,()=>{
    console.info(`server is running on http://localhost:${port}`);
});


  