"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
var typeorm_1 = require("typeorm");
//connection for production
var path_1 = __importDefault(require("path"));
var ent = ["src/entities/*.ts"];
if (path_1.default.extname(__filename) === '.js') {
    ent = ["build/entities/*.js"];
}
//connection local
exports.myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "3306"),
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "c1l2e3m1196", // la contraseña que usted creó en la instalación de mysql
    database: process.env.DATABASE_NAME || "users_db",
    entities: ent,
    logging: true,
    synchronize: true
});
