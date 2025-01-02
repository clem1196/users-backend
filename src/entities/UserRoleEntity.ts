import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
//Role
@Entity({
    synchronize:true,
    orderBy:{
        role_id:"DESC",
        created:"DESC"
    }
})
export class Role {
    @PrimaryGeneratedColumn()
    role_id:number
    @Column({type:"varchar", unique:true, nullable: false, length:16})
    roleName:string
    @Column({type: "varchar", nullable: false})
    created:string
    @Column({type: "varchar", nullable:true})
    updated?:string   
}

//user
@Entity({
    synchronize:true,
    orderBy: {
        user_id:"DESC",
        created:"DESC"
    }
})
export class User {
    @PrimaryGeneratedColumn()
    user_id:number
    @Column({type: "varchar", nullable:false, length: 64})
    fullName: string
    @Column({type: "varchar", unique:true, length:8})
    dni:string
    @Column({type:"varchar", unique:true, nullable:false})
    email:string
    @Column({type:"varchar", nullable: false})
    password:string
    @Column({type:"varchar", nullable:true, length:2083})
    urlImage?:string
    @Column({type:"varchar", nullable:true})
    last_access?: string
    @Column({type: "varchar", nullable: false})
    created:string
    @Column({type: "varchar", nullable:true})
    updated?:string 
    @ManyToMany(()=>Role, {
        cascade:true
    })
    @JoinTable({
        name:"user_role",
        joinColumn:{
            name:"userId",
            referencedColumnName:"user_id",
            foreignKeyConstraintName:"user_role_userId"
        },
        inverseJoinColumn:{
            name: "roleId",
            referencedColumnName:"role_id",
            foreignKeyConstraintName:"user_role_roleId"
        }
    })
    roles:Role[]  

    
}