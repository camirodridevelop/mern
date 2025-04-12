const Movie = require("../models/movie");
const image = require("../utils/image");

//crear pelicula
async function createMovie(req, res) {
    const movie = new Movie(req.body);

    if (req.files.image){

        const imagePath = image.getFileName(req.files.image);
        movie.image = imagePath;

   }

   //guardar pelicula base de datos

   try{
    await movie.save();
    res.status(201).send({ msg: "Pelicula guardada"});
   } catch (error){
    res.status(400).send({ msg: "Error al guardar pelicula"});
   }
}

module.exports = {
    createMovie,
};

//obtner pelicula

//obtener peliculas

//actualizar pelicula

//eliminar pelicula