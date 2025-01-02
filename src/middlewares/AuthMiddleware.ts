import { myDataSource } from "../dataSource"
import { Role, User } from "../entities/UserRoleEntity"
import jwt from "jsonwebtoken";
import { _role, _user } from "../interfaces/UserRoleInterface";

const roleRepository = myDataSource.getRepository(Role)
const userRepository = myDataSource.getRepository(User)

//decoded token

export let deco: Array<any> = []

//authentication
export const isLoggedIn = async (req, res, next) => {
    let token: any | undefined = req.headers.authorization
    if (token === undefined) {
        return res.status(401).send({ Message: "El token no es válido o no existe" })
    } else {
        let result = token.split(' ')
        if (result.length > 1) {
            token = result[1]
            jwt.verify(token, "clemente", (err: any, decoded: any) => {
                if (err)
                    return res.status(401).send({ Message: "No se pudo verificar el token", ok: false, err: err })
                deco.push(decoded)
                return next()
            })
        } else {
            token = result[0]
            jwt.verify(token, "clemente", (err: any, decoded: any) => {
                if (err)
                    return res.status(401).send({ Message: "No se pudo verificar el token", ok: false, err: err })
                deco.push(decoded)
                return next()
            })
        }
    }
}

//authorization
export const isAdmin = async (req, res, next) => {
    const roleUser: Array<_role> = deco[deco.length - 1].role.filter(
        (ro: _role) => ro.roleName !== null && ro.roleName === "admin")
    if (roleUser.length === 0) {
        return res.status(401).send({ Message: "usted no tiene permiso" })
    } else {
        return next()
    }
}

export const isEmployee = async (req, res, next) => {
    const roleUser: Array<_role> = deco[deco.length - 1].role.filter(
        (ro: _role) => ro.roleName !== null && (ro.roleName === "employee" || ro.roleName === "admin"))
    if (roleUser.length === 0) {
        return res.status(401).send({ Message: "usted no tiene permiso" })
    } else {
        return next()
    }
}

//El sistema necesita siempre de un usuario administrador por lo que no se puede eliminar ni editar
export const doNotRemoveUserAdmin = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const numberRoleAdmin: Array<_user> = await userRepository.find({
        relations: { roles: true },
        where: { roles: { roleName: "admin" } }
    })
    const userToDelete: Array<_user> = await userRepository.find({
        relations: { roles: true },
        where: { user_id: id }
    })
    if (userToDelete.length === 0) {
        return res.status(400).send({ Message: "El usuario no existe o no es válido", ok: false })
    } else {
        const userResult: Array<_role> = userToDelete[0].roles.filter(
            (ur: _role) => ur.roleName !== null && ur.roleName === "admin")
        if (userResult.length > 0 && numberRoleAdmin.length < 2) {
            return res.status(400).send({ Message: "El usuario 'admin' no puede ser eliminado ni editado", ok: false })
        } else {
            return next()
        }
    }

}
