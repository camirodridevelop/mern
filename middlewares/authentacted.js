const jwt = require("../utils/jwt")

function mdAuth(req, res, next){

    //verificamos que le md reciba el token
    if(!req.headers.authorization) {
        res.status(403).send ({ msg: "La peticion no tiene cabecera"});
    };

    //token
    const token = req.headers.authorization.replace("Bearer ", "");
   
    try{

        //utilizamos la funcion decode
        //para recibir los datos detras del token

        //
        const payload = jwt.decode(token); 
       
        //verificar fecha de expiracion 
        const { exp } = payload;
        const currentData = new Date().getTime() / 1000; 
        
        //si el token no ha expirado
        //pregunto se la fecha de exp el igual o superior a la fecha del token
        if(exp  <= currentData) {
            return res.status(400).send({ msg: "El token ha expirado"});
        }

        //voy a pasar la info del payload a el controlador
        //obtener el usuario y enviarlo al controlador(paylod) y que pase a la siguiente
        req.user = payload; //enviar datos paylod
        next(); //sigiiente funcion

     }catch(error){
       return res.status(400).send({ msg: "Token Invalido"});
    }
    
   // next();


}
module.exports ={
    mdAuth,
};