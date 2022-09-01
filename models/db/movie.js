const mongoose = require("mongoose");

const star = {name:{type:String}}
const movieSchema = mongoose.Schema({
        name:{type:String,required:true},
        director:{type:String,required:true},
        releaseDate:{type:Date,required:true},
        duration:{type:Number,required:true},//in minutes
        cast:[star],
        language:{type:String,required:true,enum:["ENGLISH","HINDHI","THAMIL","MALAYALAM","OTHERS"]} });

module.exports = mongoose.model("movie",movieSchema);