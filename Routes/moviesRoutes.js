const express = require('express')

const routes = express.Router();

const moviesclt = require('../controller/movieController')

const movie = require('../model/moviesModel');


console.log('movies routes')



routes.post('/insertdata',movie.UploadImage,moviesclt.insertdata)

routes.get('/',moviesclt.viewdata)

routes.get('/singledata',moviesclt.singledata)

routes.get('/deletemovie',moviesclt.deletedata)



module.exports = routes;