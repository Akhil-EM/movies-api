const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie");
const {validationStatus,
       validateMovie} = require("../middleware/validator");

router.post("/",validateMovie(),
                validationStatus,
                movieController.addMovie);

router.get("/",movieController.getMovies);
router.get("/:id",movieController.getMovie);
router.get("/:name/by-name",movieController.getMoviesByName)
router.put("/:id",validateMovie(),
                  validationStatus,
                  movieController.updateMovie);
router.delete("/:id",movieController.deleteMovie);





module.exports = router;