const express = require('express');
const port = 8000;
const app = express();



app.get('/',(req,res)=>{
  res.send({obj:'123'})
})

app.listen(port, (err)=>{
  if(err){
    console.log(`Error in running the server: ${err}`)
  }
  console.log(`app listening on localhostlistening at http://localhost:${port}`)
})
