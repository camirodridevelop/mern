function mdAuth(reg, res, next){
    console.log("Estoy en el middlewares")

    //lo podemos bloquear
    res.status(500).send({ msg: "MD bloquea"})
    
    next();
}
module.exports ={
    mdAuth,
};