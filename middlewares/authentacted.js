const jwt = require("../utils/jwt")

function mdAuth(req, res, next){
    if(!req.headers.authorization) {
        res.status(403).send ({ msg: "La peticion non tiene cabecera"});
    };

    const token = req.headers.authorization.replace("Bearer ", "");
   
    try{
        const payload = jwt.decode(token) 
        console.log(payload)
      

        }catch(error){
        res.status(400).send({ msg: "Token Invalido"})
    }
    //next();

   
}
module.exports ={
    mdAuth,
};