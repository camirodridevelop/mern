function register (req, res){
    console.log ("se ha ejecutado correctamente");

    res.status(200).send({msg:"Todo Okey" });
}

module.exports = {
    register,
};