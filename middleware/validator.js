const {body,validationResult} = require("express-validator");
const statusCodes = require("../util/status-codes");
const response = require("../models/api/response.model");

const validateMovie = ()=>[
    body("name","name of the movie required").trim().not().isEmpty(),
    body("director","name of the director required").trim().not().isEmpty(),
    body("releaseDate","release date required").trim().not().isEmpty(),
    body("duration").trim().not().isEmpty().withMessage("duration required")
                    .isLength({min:1,max:4}).withMessage("invalid duration"),
    body("cast").custom(cast=>{
                   return Array.isArray(cast) && (cast.length > 0)
                }).withMessage("at least one actor /actress required (array format)"),
    body("language").not().isEmpty().withMessage("movie language required")
                    .isIn(["ENGLISH","HINDHI","THAMIL","MALAYALAM","OTHERS"])
                    .withMessage(`language must be in ENGLISH or HINDHI or THAMIL or MALAYALAM or OTHERS`)
                ]



const validationStatus = (req,res,next)=>{
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }
  
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(statusCodes.UNPROCESSABLE_ENTITY)
              .json(response("failed","validation errors",{ errors: extractedErrors}));
  }
  
  module.exports = {validationStatus,
                    validateMovie}




