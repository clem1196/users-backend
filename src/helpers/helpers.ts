import { myDataSource } from "../dataSource"
import { Role, User } from "../entities/UserRoleEntity"
import { _role, _user } from "../interfaces/UserRoleInterface"

const roleRepository = myDataSource.getRepository(Role)
const userRepository = myDataSource.getRepository(User)

//funcion que eliminará los roles que no se están usando
export const removeUnrelatedRoles = async () => {
    const userList: Array<_user> = await userRepository.find({ relations: { roles: true } })
    if (userList.length > 0) {
        //obteniendo el total de roles
        const roleList: Array<_role> = await roleRepository.find()
        //obteniendo los roles que se están usando
        let rolesRelacionados: Array<_role> = []
        for (let index = 0; index < userList.length; index++) {
            const element = userList[index].roles;
            for (let index = 0; index < element.length; index++) {
                const elem = element[index];
                rolesRelacionados.push(elem)

            }
        }
        //quitando roles duplicados
        let verify = {}
        rolesRelacionados = rolesRelacionados.filter(r => verify[r.roleName] ? false : verify[r.roleName] = true)
        //obteniendo roles que no están relacionados con users
        const rolesNoRelacionados = roleList.reduce((previous: any, current: any) => {
            const item = rolesRelacionados.find(
                (x: _role) => x.roleName === current.roleName && x.role_id === current.role_id
            )
            if (!item) previous = [...previous, current]
            return previous
        }, []
        )
        if (rolesNoRelacionados.length > 0) {
            //eliminando roles que no están relacionados con users
            for (let index = 0; index < rolesNoRelacionados.length; index++) {
                const element = rolesNoRelacionados[index].role_id;
                await roleRepository.delete(element)

            }

        }
    }
}