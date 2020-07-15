const express = require('express');
const cookieParser = require('cookie-parser')
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const User = require('./models/user')

app.use(express.urlencoded());
app.use(cookieParser())

app.use(expressLayouts)
app.use(express.static('./assets'))

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles' , true)
app.set('layout extractScripts' , true)



//use express router
app.use('/', require('./routes'))
app.set('view engine','ejs')
app.set('views', './views')

app.listen(port, (err)=>{
  if(err){
    console.log(`Error in running the server: ${err}`)
  }
  console.log(`app listening on localhostlistening at http://localhost:${port}`)
})
