import { myDataSource } from "../dataSource";
import { Role, User } from "../entities/UserRoleEntity";
import { _role, _user } from "../interfaces/UserRoleInterface";
import bcrypt from "bcryptjs";
import { removeUnrelatedRoles } from "../helpers/helpers";
import { deco } from "../middlewares/AuthMiddleware";

const roleRepository = myDataSource.getRepository(Role)
const userRepository = myDataSource.getRepository(User)

//get user All
export const userAll = async (req, res) => {
    //llamamos a la funcion para eliminar los roles que no estan siendo usados
    await removeUnrelatedRoles()
    //list users
    const userList: Array<_user> = await userRepository.find({ relations: { roles: true } })
    try {
        if (userList.length > 0) {
            //obteniendo lista de roles
            const roleList: Array<_role> = await roleRepository.find()
            return res.status(200).send({ Message: "OK", userList: userList, roleList: roleList })
        }
        return res.status(404).send(({ Message: "No hay datos que mostrar" }))
    } catch (error: any) {
        return res.send(error.sqlMessage)
    }
}

//get userOne
export const userOne = async (req, res) => {
    //llamamos a la funcion para eliminar los roles que no estan siendo usados
    await removeUnrelatedRoles()
    //list users
    const userById: Array<_user> = await userRepository.find({
        relations: { roles: true },
        where: { user_id: parseInt(req.params.id) }
    })
    try {
        if (userById.length > 0) {
            return res.status(200).send({ Message: "OK", user: userById })
        }
        return res.status(404).send(({ Message: "El usuario no existe o el 'id' no es válido" }))
    } catch (error: any) {
        return res.send(error.sqlMessage)
    }
}

//create user
export const userCreate = async (req, res) => {
    //llamamos a la funcion para eliminar los roles que no estan siendo usados
    await removeUnrelatedRoles()

    const { email, password, fullName, dni, urlImage, roles } = req.body
    //find by email
    const emailExists: Array<_user> = await userRepository.find({
        relations: { roles: true },
        where: { email: email }
    })
    //find by dni
    const dniExists: Array<_user> = await userRepository.find({
        relations: { roles: true },
        where: { dni: dni }
    })

    //find role
    const role: Array<_role> = await roleRepository.find({
        where: { roleName: roles }
    })
    try {

        if (emailExists.length > 0) {
            return res.status(409).send({ Message: "El email ya existe!" })
        } else if (dniExists.length > 0) {
            return res.status(409).send({ Message: "El dni ya existe!" })
        }
        else {
            //si el rol no existe en la base de datos
            if (role.length === 0) {
                //create role
                const newRole: object = roleRepository.create({
                    roleName: roles,
                    created: new Date(Date.now()).toLocaleString("pe-PE")
                })
                await myDataSource.manager.save(newRole)
                //create user
                const newUser: object = userRepository.create({
                    email: email,
                    password: await bcrypt.hash(password, 10),
                    fullName: fullName.toLocaleLowerCase(),
                    dni: dni,
                    urlImage: urlImage,
                    created: new Date(Date.now()).toLocaleString("pe-PE"),
                    roles: [newRole]
                })
                const results: object = await userRepository.save(newUser)
                return res.status(201).send({ Message: "Se creó correctamente", results: results })
            }
            // si el rol ya existe en la base de datos
            else {
                //create user
                const newUser: object = userRepository.create({
                    email: email,
                    password: await bcrypt.hash(password, 10),
                    fullName: fullName.toLocaleLowerCase(),
                    dni: dni,
                    urlImage: urlImage,
                    created: new Date(Date.now()).toLocaleString("pe-PE"),
                    roles: role
                })
                const results: object = await userRepository.save(newUser)
                return res.status(201).send({ Message: "Se creó correctamente", results: results })
            }
        }
    } catch (error: any) {
        return res.send(error.sqlMessage)
    }
}

//edit user
export const userEdit = async (req, res) => {
    //llamamos a la funcion para eliminar los roles que no estan siendo usados
    await removeUnrelatedRoles()
    let { email, password, fullName, dni, urlImage, roles, index/*solo para desarrollo*/ } = req.body
    let comparison: boolean = true
    const user: Array<_user> = await userRepository.find({
        relations: { roles: true },
        where: { user_id: parseInt(req.params.id) }
    })
    try {
        if (user.length > 0) {
            const emailExists: object | null = await userRepository.createQueryBuilder("user")
                .where("user.email=:email", { email: email })
                .andWhere("user.user_id!=:user_id", { user_id: req.params.id }).getOne()
            const dniExists: object | null = await userRepository.createQueryBuilder("user")
                .where("user.dni=:dni", { dni: dni })
                .andWhere("user.user_id!=:user_id", { user_id: req.params.id }).getOne()
            if (emailExists !== null) {
                return res.status(409).send({ Message: "El email ya existe" })
            } else if (dniExists !== null) {
                return res.status(409).send({ Message: "El dni ya existe" })
            }
            else {
                const userRoles = user[0].roles
                if (password !== user[0].password) {
                    comparison = await bcrypt.compare(password, user[0].password)
                    if (comparison !== true) {
                        req.body.password = await bcrypt.hash(password, 10)
                    } else {
                        req.body.password = await user[0].password
                    }
                }
                if (index !== null) {
                    if (typeof roles !== "object") {
                        const role: Array<_role> = await roleRepository.find({
                            where: { roleName: roles }
                        })
                        //si roles ya existe en la bd
                        if (role.length > 0) {
                            const roleYaExists = userRoles.filter((r: _role) => r.roleName === roles)
                            if (roleYaExists.length > 0) {
                                return res.status(409).send({ Message: "el rol ya existe" })
                            } else {
                                // para eliminar
                                if (roles.length === 0) {
                                    userRoles.splice(index, 1)
                                    req.body.updated = new Date(Date.now()).toLocaleString("pe-PE")
                                    userRepository.merge(user[0], req.body)
                                    const results = await userRepository.save(user)
                                    if (user[0].user_id !== deco[deco.length - 1].userId) {
                                        return res.status(201).send({ loginAgain: false, Message: "Se editó correctamente", results: results })
                                    }
                                    return res.status(201).send({ loginAgain: true, Message: "Se editó correctamente, debe cerrar e iniciar nuevamente sesión", results: results })
                                } else {
                                    //para reemplazar o agregar
                                    userRoles.splice(index, 1, role[0])
                                    req.body.updated = new Date(Date.now()).toLocaleString("pe-PE")
                                    userRepository.merge(user[0], req.body)
                                    const results = await userRepository.save(user)
                                    if (user[0].user_id !== deco[deco.length - 1].userId) {
                                        return res.status(201).send({ loginAgain: false, Message: "Se editó correctamente", results: results })
                                    }
                                    return res.status(201).send({ loginAgain: true, Message: "Se editó correctamente, debe cerrar e iniciar nuevamente sesión", results: results })

                                }
                            }
                        }
                        //si el rol no existe en la bd
                        else {
                            //para reemplazar o agregar
                            if (roles.length > 0) {
                                //create role
                                const newRole: _role = roleRepository.create({
                                    roleName: roles,
                                    created: new Date(Date.now()).toLocaleString("pe-PE")

                                })
                                await myDataSource.manager.save(newRole)
                                userRoles.splice(index, 1, newRole)
                                req.body.updated = new Date(Date.now()).toLocaleString("pe-PE")
                                userRepository.merge(user[0], req.body)
                                const results = await userRepository.save(user)
                                if (user[0].user_id !== deco[deco.length - 1].userId) {
                                    return res.status(201).send({ loginAgain: false, Message: "Se editó correctamente", results: results })
                                }
                                return res.status(201).send({ loginAgain: true, Message: "Se editó correctamente, debe cerrar e iniciar nuevamente sesión", results: results })
                            }
                            //para eliminar
                            else {
                                if (index > userRoles.length - 1) {
                                    return res.status(400).send({ Message: "No hay rol que eliminar en esa posición" })
                                }
                                else {
                                    userRoles.splice(index, 1)
                                    req.body.updated = new Date(Date.now()).toLocaleString("pe-PE")
                                    userRepository.merge(user[0], req.body)
                                    const results = await userRepository.save(user)

                                    if (user[0].user_id !== deco[deco.length - 1].userId) {
                                        return res.status(201).send({ loginAgain: false, Message: "Se editó correctamente", results: results })
                                    }
                                    return res.status(201).send({ loginAgain: true, Message: "Se editó correctamente, debe cerrar e iniciar nuevamente sesión", results: results })
                                }
                            }
                        }
                    }
                }
                else if (
                    fullName !== user[0].fullName ||
                    dni !== user[0].dni ||
                    email !== user[0].email ||
                    (urlImage !== undefined && urlImage !== user[0].urlImage) ||
                    (password !== user[0].password && comparison !== true)
                ) {
                    //editar tipicamente
                    req.body.updated = new Date(Date.now()).toLocaleString("pe-PE")
                    userRepository.merge(user[0], req.body)
                    const results = await userRepository.save(user)
                    if (user[0].user_id !== deco[deco.length - 1].userId) {
                        return res.status(201).send({ loginAgain: false, Message: "Se editó correctamente", results: results })
                    }
                    return res.status(201).send({ loginAgain: true, Message: "Se editó correctamente, debe cerrar e iniciar nuevamente sesión", results: results })

                } else {
                    return res.send({ Message: "No hubo cambios" })
                }
            }
        } else {
            return res.status(400).send({ Message: "El usuario no existe o el 'id' no es válido" })
        }
    } catch (error: any) {
        return res.send(error.sqlMessage)
    }
}
//user delete
export const userRemove = async (req, res) => {
    //llamamos a la funcion para eliminar los roles que no estan siendo usados
    await removeUnrelatedRoles()
    try {
        const user: Array<_user> = await userRepository.find({
            relations: { roles: true },
            where: { user_id: parseInt(req.params.id) }
        })
        if (user.length > 0) {
            const results = await userRepository.delete(req.params.id)
            if (results.affected === 1) {
                if (user[0].user_id !== deco[deco.length - 1].userId) {
                    return res.status(201).send({ loginAgain: false, Message: "Se elimió correctamente", results: results })
                }
                return res.status(201).send({ loginAgain: true, Message: "Se eliminó correctamente, debe cerrar e iniciar nuevamente sesión", results: results })
            } else {
                return res.send({ Message: "No se pudo eliminar" })
            }
        } else {
            return res.status(400).send({ Message: "El usuario no existe o el 'id' no es válido" })
        }
    } catch (error: any) {
        return res.send(error.sqlMessage)
    }
}
