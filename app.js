const express = require('express');
const port = 8007;
const path = require('path')
const app = express()
const mongoose = require('mongoose')
// const db = require('./config/mongoose')

const db = mongoose.connect('mongodb+srv://arpitshekhda45:gPbdGSGTvYJHpNev@cluster0.nwtwk.mongodb.net/datamovie')
if(db){
    console.log('db connected')
}
else{
    console.log('db not conneted')
}

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


app.use('/uploads/moviesImg',express.static(path.join(__dirname,'uploads/moviesImg')))
app.use(express.static(path.join(__dirname,'assets')))

app.use('/',require('./Routes/moviesRoutes'))

app.listen(port,(err)=>{
    if(err){
        console.log(err)
        return false;
    }
    console.log('server started')
})
