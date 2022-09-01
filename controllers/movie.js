const response = require("../models/api/response.model");
const statusCodes = require("../util/status-codes");

const movieModel = require("../models/db/movie");
const { json } = require("express");

exports.addMovie = async (req,res)=>{
    
    try{
        let {name,director,releaseDate,duration,cast,language}= req.body;
        cast = cast.map(star =>({"name":star}));
        
        await new movieModel({name,director,releaseDate,duration,cast,language}).save();

        res.status(statusCodes.OK)
           .json(response("success","movie added"))

    }catch(error){
        res.status(statusCodes.INTERNAL_SERVER_ERROR)
           .json(response("error",error.message))
    }
}

exports.getMovies = async (req,res)=>{
    
    try{
        
        let movies = await movieModel.find({},{"id":1,"name":1,"releaseDate":1});
        
        res.status(statusCodes.OK)
           .json(response("success","movies",{movies:movies}));

    }catch(error){
        res.status(statusCodes.INTERNAL_SERVER_ERROR)
           .json(response("error",error.message))
    }
}

exports.getMovie = async (req,res)=>{
    
    try{
        let id = req.params.id;
        let movie = await movieModel.findById(id);
        
        res.status(statusCodes.OK)
           .json(response("success","movies",{movie:movie}));

    }catch(error){
        res.status(statusCodes.INTERNAL_SERVER_ERROR)
           .json(response("error",error.message))
    }
}

exports.getMoviesByName = async (req,res)=>{
    
    try{
        let name = req.params.name;
        let movies = await movieModel.find({name:{$regex:'.*' +name+ '.*',$options:"$i"}},
                                           {"id":1,"name":1,"releaseDate":1});
        //$options:"$i" for checking case insensitive
        
        res.status(statusCodes.OK)
           .json(response("success","movies",{movies:movies}));

    }catch(error){
        res.status(statusCodes.INTERNAL_SERVER_ERROR)
           .json(response("error",error.message))
    }
}

exports.updateMovie = async (req,res)=>{
    
    try{
        let id = req.params.id;
        let {name,director,releaseDate,duration,cast,language}= req.body;
        cast = cast.map(star =>({"name":star}));

        await movieModel.findByIdAndUpdate(id,{name:name,
                                               director:director,
                                               releaseDate:releaseDate,
                                               duration:duration,
                                               cast:cast,
                                               language:language});

        let movie = await movieModel.findById(id);
        res.status(statusCodes.OK)
           .json(response("success","movie updated",{movie:movie}));

    }catch(error){
        res.status(statusCodes.INTERNAL_SERVER_ERROR)
           .json(response("error",error.message))
    }
}

exports.deleteMovie = async (req,res)=>{
    
    try{
        let id = req.params.id;
        

        await movieModel.findByIdAndDelete(id);
                                               
      
        res.status(statusCodes.OK)
           .json(response("success","movie deleted"));

    }catch(error){
        res.status(statusCodes.INTERNAL_SERVER_ERROR)
           .json(response("error",error.message))
    }
}