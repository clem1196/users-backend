import { DataSource } from "typeorm";
//connection for production
import path from "path";
let ent=["src/entities/*.ts"]
if (path.extname(__filename)==='.js') {
    ent=["build/entities/*.js"]
    
}

//connection local
export const myDataSource=new DataSource(
    {
        type:"mysql",
        host:process.env.DATABASE_HOST || "localhost",
        port: parseInt(process.env.DATABASE_PORT || "3306"),
        username:process.env.DATABASE_USER || "root",
        password:process.env.DATABASE_PASSWORD || "c1l2e3m1196", // la contraseña que usted creó en la instalación de mysql
        database: process.env.DATABASE_NAME || "users_db",
        entities:ent,
        logging:true,
        synchronize:true
    }
)