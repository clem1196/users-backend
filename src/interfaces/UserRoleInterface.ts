//Role
export interface _role {
    role_id:number
    roleName:string
    created:string
    updated?:string
}

//User
export interface _user {
    user_id: number
    fullName:string
    dni:string
    email:string
    password: string
    urlImage?: string
    last_access?: string
    created:string
    updated?:string
    roles: Array<_role>
}