const movies = require('../model/moviesModel')

const path = require('path')

const fs = require('fs')


module.exports.insertdata = async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.file)
        let newimg = ''
        if(req.file){
            newimg = await movies.imgpath+'/'+req.file.filename
        }
        req.body.image = newimg;
        await movies.create(req.body);
        res.redirect('back')
    }
    catch(err){
        console.log(err)
        return res.redirect('back')
    }
}

module.exports.viewdata = async (req, res) => {
    try {
        let search = ''
        if(req.query.search){
            search = req.query.search;
        }

        perPage = 4
        page = 0

        if(req.query.page){
            page = req.query.page;
        }

        let moviesdata = await movies.find({
            $or:[
              
                    { moviename : {$regex: search}}
              
            ]
        }).skip(page*perPage).limit(perPage)

        let total = await movies.find({
            $or:[
              
                    { moviename : {$regex: search}}
              
            ]
        }).countDocuments()
        let moviesblog = ( Math.ceil(total/perPage))
        
        res.render('movies/addmovies', { 
            moviesdata,
            moviesblog,
            page,
            search
            
        });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

module.exports.singledata = async (req,res)=>{
        let singledata = await movies.findById(req.query.id)
        console.log(singledata)
        res.render('movies/singlepage',{
            singledata,
          
        })
}

module.exports.deletedata = async(req,res)=>{
    try{
        let singledata = await movies.findById(req.query.id);
        console.log(singledata)

        try{
            let deletepath = path.join(__dirname,'..',singledata.image)
            await fs.unlinkSync(deletepath)
        }
        catch(err){
            console.log(err)
        }
        let deletedata = await movies.findByIdAndDelete(req.query.id)
        if(deletedata){
            console.log('data deleted sucessfully')
            return res.redirect('back')
        }

    }
    catch(err){
        console.log(err)
        return res.redirect('back')

    }
}