import express, { Express } from "express";
import { myDataSource } from "./dataSource";
import userRouter from "./routes/UserRoleLoginRoute";
import { Role, User } from "./entities/UserRoleEntity";
import { _user } from "./interfaces/UserRoleInterface";
import bcrypt from "bcryptjs";
import  bodyParser  from "body-parser";
import cors from "cors";

//estableciendo la coneccion con la base de datos
myDataSource.initialize().then(async () => {

    const roleRepository = myDataSource.getRepository(Role)
    const userRepository = myDataSource.getRepository(User)
    const userList: Array<_user> = await userRepository.find({ relations: { roles: true } })

    //si no tenemos ningun registro de usuarios en la bd hacemos lo siguiente:
    if (userList.length === 0) {
        //create role
        const newRole: object = roleRepository.create({
            roleName: 'admin',
            created: new Date(Date.now()).toLocaleString("pe-PE")
        })
        await myDataSource.manager.save(newRole)
        //create user
        const newUser: object = userRepository.create({
            fullName: 'clemente',
            email: 'clem@gmail.com',
            password: await bcrypt.hash('Clem2024', 10),
            dni: '20418596',
            urlImage: 'http://mywebstarage/image',
            created: new Date(Date.now()).toLocaleString("pe-PE"),
            roles: [newRole]
        })
        await userRepository.save(newUser)
        console.log("Data Source se ha inicializado!")
        const app: Express = express()
        const PORT = process.env.PORT || 3000
        //middlewares
        app.use(cors())
        app.use(bodyParser.json())
        //paths
        app.use(userRouter)
        //inicio del servidor
        app.listen(PORT, () => {
            console.log("El servidor está escuchando en el puerto" + " " + PORT)
        })
    } else {
        console.log("Data Source se ha inicializado!")
        const app: Express = express()
        const PORT = process.env.PORT || 3000
        //middlewares
        app.use(cors())
        app.use(bodyParser.json())
        //paths
        app.use(userRouter)
        //inicio del servidor
        app.listen(PORT, () => {
            console.log("El servidor está escuchando en el puerto" + " " + PORT)
        })
    }

}).catch((err) => {
    console.log("Error durante la conección a la base de datos", err)
})


