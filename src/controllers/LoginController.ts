import { myDataSource } from "../dataSource";
import { User } from "../entities/UserRoleEntity";
import { _user } from "../interfaces/UserRoleInterface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRepository = myDataSource.getRepository(User)
//login
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        //get user by email
        const users: Array<_user> = await userRepository.find({
            relations: { roles: true },
            where: { email: email }
        })
        //verificamos si email existe en la base de datos
        if (users.length === 0)
            return res.status(404).send({ Message: "el usuario no existe" })
        //verificamos que el password es lo mismo que la base de datos
        const comparison: boolean = await bcrypt.compare(password, users[0].password)
        if (comparison !== true)
            return res.status(404).send({ Message: "La contraseña es incorrecto" })
        //chequeamos que el usuario esté asignado al menos un rol
        if (users[0].roles.length === 0)
            return res.status(400).send({ Message: "El usuario no tiene un rol asignado" })
        //creamos el token y la firma
        const token: string = jwt.sign({
            userId: users[0].user_id,
            email: users[0].email,
            fullName: users[0].fullName,
            role: users[0].roles
        },
            "clemente",
            {
                expiresIn: "1d"
            }
        )
        //actualizamos el campo last_access
        users[0].last_access = new Date(Date.now()).toLocaleString("pe-PE")
        const results: Array<_user> = await userRepository.save(users)
        return res.status(200).send({ Message: "Logged In", token, results: results })
    } catch (error: any) {
        console.log(error)
    }
}