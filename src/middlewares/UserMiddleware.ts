
import { myDataSource } from "../dataSource";
import { User } from "../entities/UserRoleEntity";
import { _user } from "../interfaces/UserRoleInterface";

const userRepository=myDataSource.getRepository(User)
//expresiones regulares
const emailRegex = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
const roleNameRegex = /^[a-zA-Z]{3,16}$/;
const dniRegex=/^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/
const namesRegex = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]{3,64}$/; /*solo letras y espacios*/

//VALIDACION DE LOS CAMPOS DE USERS

export const fieldUsers=async (req, res, next)=>{
    let {email, fullName, dni}=req.body
    //Email
    if (email===undefined||email.length===0) {
        return res.status(400).send({Message:"El 'email' es requerido"})
    }else if(!emailRegex.test(email)){
        return res.status(400).send({Message:"El 'email' no es válido"})
    }
    //dni
    else if(dni===undefined||dni.length===0){
        return res.status(400).send({Message:"El 'dni' es requerido"})
    }else if(!dniRegex.test(dni)){
        return res.status(400).send({Message:"El 'dni' no es válido"})
    }
    //fullName
    else if(fullName===undefined||fullName.length===0){
        return res.status(400).send({Message:"El campo 'fullName' es requerido"})
    }else if(!namesRegex.test(fullName)){
        return res.status(400).send({Message:"Ingrese en 'fullname' solo espacios y letras mínimo 3 y máximo 64"})
    } else{
        return next()
    }
}
//password create
export const passwordPost=async (req, res, next)=>{
    let {password}=req.body
    if (password===undefined||password.length===0) {
        return res.status(400).send({Message:"El 'password' es requerido"})
    }else if(!passwordRegex.test(password)){
        return res.status(400).send({Message:`Ingrese en 'password' entre 8 y 16 caracteres y al menos un caracter numerico
            y un letra myuscula`
        })
    }else{
        return next()
    }
}
// password edit
export const passwordPut=async(req, res, next)=>{
    let {password}=req.body
    const pass:Array<_user>=await userRepository.find({where:{user_id: parseInt(req.params.id)}})
    if (password===pass[0].password) {
        return next()
    }else if(password===undefined ||password.length===0){
        return res.status(400).send({Message:"El 'password' es requerido"})
    }else if(!passwordRegex.test(password)){
        return res.status(400).send({Message:`Ingrese en 'password' entre 8 y 16 caracteres y al menos un caracter numerico
            y un letra myuscula`})
    }else{
        return next()
    }
}
//roles create
export const rolesPost=async(req, res, next)=>{
    let {roles}=req.body
    if (roles===undefined||roles.length===0) {
        return res.status(400).send({Message:"El 'rol' es requerido"})
    }else if(roles!==undefined&&roles.length>0&&!roleNameRegex.test(roles)){
        return res.status(400).send({Message:"Ingrese 'roles' minimo 3 o maximo 16 caracteeres solo letras "})
    }
    else{
        return next()
    }
}
//roles edit
export const rolesPut=async(req, res, next)=>{
    let{roles}=req.body
    if (typeof roles==="object") {
        return next()
    }else if(roles!==undefined&& roles.length>0&&!roleNameRegex.test(roles)){
        return res.status(400).send({Message:"Ingrese en 'roles' minimo 3 o maximo 16 caracteeres solo letras"})
    }else{
        return next()
    }
}