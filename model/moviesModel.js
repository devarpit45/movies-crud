const mongoose = require('mongoose')

const multer = require('multer')

const path = require('path')

const ImagePath  = '/uploads/moviesImg'

const moviesSchema = mongoose.Schema({
    moviename:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    vision:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
    
})

    const storagedata = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,path.join(__dirname,'..',ImagePath))
        },
        filename:(req,file,cb)=>{
            cb(null,file.fieldname+'-'+Date.now())
        }
    })

  moviesSchema.statics.UploadImage = multer({storage:storagedata}).single('image')
  moviesSchema.statics.imgpath = ImagePath;  


const movies = mongoose.model('movies',moviesSchema)
module.exports = movies;