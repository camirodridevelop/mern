const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require ("../utils/jwt");

async function register (req, res){

    //la logica de obtener los datos desde el front,aplicar alguna validacion,guardar en la base de datos
    //recibir los datos

    const {firstname, lastname, password, email }=req.body;

    //validar dos datos

    if(!email)res.status(400).send({ msg: 'El email es obligatorio'});
    if(!password) res.status(400).send({ msg: 'La contaseña es obligatorio'});

    //crear usuario
    const user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email.toLowerCase(),
        password: password,
        role:"user",
        active: false,
    
    })

    console.log(user)
    //tambien se puede hacer con const User = new User(...req.body)
    
   
    //antes de guardar en la base d edatos encriptar contraseña (bcryptjscls)
    const salt= bcrypt.genSaltSync(10);
    const hashPassword=bcrypt.hashSync(password, salt)

    user.password= hashPassword;

    //guardar el usuario en la base de datos
    try{
        await user.save();
        res.status(201).send({ msg:"Usuario Guardado"});
    }catch(error){
        res.status(400).send({ msg:"Error al crear el ususario: " + error});
    }
}


//iniciar sesion

async function login(req, res) {
    //logica
    //recibir los datos
    const {email, password} = req.body;

    //validar los datos
    if (!email) return res.status(400).send({ msg: "El email es obligatorio"});
    if (!password) return res.status(400).send({ msg: "La contrasena es obligatoria"});

    //validar si existe el usuario finOne
    try{
        const user = await User.findOne({ email: email.toLowerCase() });

        //validar la contrasena del usuario
        const check = await bcrypt.compare(password,user.password);
    //console.log(check)
        if(!check){
        res.status(400).send({msg: "Contrasena incorrecta"});
    } else if(!user.active){
        //validar su esta habiliatdo el usuario
        res.status(401).send({ msg:"Usuario no autorizado o no activo"});
    } else {
         //iniciar sesion
         res.status(200).send({ access_token: jwt.createAccessToken(user)});
    }
    

    } catch(error){
        res.status(500).send({ msg: "Error en el servidor"});
    }


   
}





module.exports = {
    register,
    login,
};