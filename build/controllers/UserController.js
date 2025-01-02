"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRemove = exports.userEdit = exports.userCreate = exports.userOne = exports.userAll = void 0;
var dataSource_1 = require("../dataSource");
var UserRoleEntity_1 = require("../entities/UserRoleEntity");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var helpers_1 = require("../helpers/helpers");
var AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
var roleRepository = dataSource_1.myDataSource.getRepository(UserRoleEntity_1.Role);
var userRepository = dataSource_1.myDataSource.getRepository(UserRoleEntity_1.User);
//get user All
var userAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userList, roleList, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            //llamamos a la funcion para eliminar los roles que no estan siendo usados
            return [4 /*yield*/, (0, helpers_1.removeUnrelatedRoles)()
                //list users
            ];
            case 1:
                //llamamos a la funcion para eliminar los roles que no estan siendo usados
                _a.sent();
                return [4 /*yield*/, userRepository.find({ relations: { roles: true } })];
            case 2:
                userList = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 6, , 7]);
                if (!(userList.length > 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, roleRepository.find()];
            case 4:
                roleList = _a.sent();
                return [2 /*return*/, res.status(200).send({ Message: "OK", userList: userList, roleList: roleList })];
            case 5: return [2 /*return*/, res.status(404).send(({ Message: "No hay datos que mostrar" }))];
            case 6:
                error_1 = _a.sent();
                return [2 /*return*/, res.send(error_1.sqlMessage)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.userAll = userAll;
//get userOne
var userOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userById;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            //llamamos a la funcion para eliminar los roles que no estan siendo usados
            return [4 /*yield*/, (0, helpers_1.removeUnrelatedRoles)()
                //list users
            ];
            case 1:
                //llamamos a la funcion para eliminar los roles que no estan siendo usados
                _a.sent();
                return [4 /*yield*/, userRepository.find({
                        relations: { roles: true },
                        where: { user_id: parseInt(req.params.id) }
                    })];
            case 2:
                userById = _a.sent();
                try {
                    if (userById.length > 0) {
                        return [2 /*return*/, res.status(200).send({ Message: "OK", user: userById })];
                    }
                    return [2 /*return*/, res.status(404).send(({ Message: "El usuario no existe o el 'id' no es válido" }))];
                }
                catch (error) {
                    return [2 /*return*/, res.send(error.sqlMessage)];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.userOne = userOne;
//create user
var userCreate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, fullName, dni, urlImage, roles, emailExists, dniExists, role, newRole, newUser, _b, _c, results, newUser, _d, _e, results, error_2;
    var _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0: 
            //llamamos a la funcion para eliminar los roles que no estan siendo usados
            return [4 /*yield*/, (0, helpers_1.removeUnrelatedRoles)()];
            case 1:
                //llamamos a la funcion para eliminar los roles que no estan siendo usados
                _h.sent();
                _a = req.body, email = _a.email, password = _a.password, fullName = _a.fullName, dni = _a.dni, urlImage = _a.urlImage, roles = _a.roles;
                return [4 /*yield*/, userRepository.find({
                        relations: { roles: true },
                        where: { email: email }
                    })
                    //find by dni
                ];
            case 2:
                emailExists = _h.sent();
                return [4 /*yield*/, userRepository.find({
                        relations: { roles: true },
                        where: { dni: dni }
                    })
                    //find role
                ];
            case 3:
                dniExists = _h.sent();
                return [4 /*yield*/, roleRepository.find({
                        where: { roleName: roles }
                    })];
            case 4:
                role = _h.sent();
                _h.label = 5;
            case 5:
                _h.trys.push([5, 15, , 16]);
                if (!(emailExists.length > 0)) return [3 /*break*/, 6];
                return [2 /*return*/, res.status(409).send({ Message: "El email ya existe!" })];
            case 6:
                if (!(dniExists.length > 0)) return [3 /*break*/, 7];
                return [2 /*return*/, res.status(409).send({ Message: "El dni ya existe!" })];
            case 7:
                if (!(role.length === 0)) return [3 /*break*/, 11];
                newRole = roleRepository.create({
                    roleName: roles,
                    created: new Date(Date.now()).toLocaleString("pe-PE")
                });
                return [4 /*yield*/, dataSource_1.myDataSource.manager.save(newRole)
                    //create user
                ];
            case 8:
                _h.sent();
                _c = (_b = userRepository).create;
                _f = {
                    email: email
                };
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 9:
                newUser = _c.apply(_b, [(_f.password = _h.sent(),
                        _f.fullName = fullName.toLocaleLowerCase(),
                        _f.dni = dni,
                        _f.urlImage = urlImage,
                        _f.created = new Date(Date.now()).toLocaleString("pe-PE"),
                        _f.roles = [newRole],
                        _f)]);
                return [4 /*yield*/, userRepository.save(newUser)];
            case 10:
                results = _h.sent();
                return [2 /*return*/, res.status(201).send({ Message: "Se creó correctamente", results: results })];
            case 11:
                _e = (_d = userRepository).create;
                _g = {
                    email: email
                };
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 12:
                newUser = _e.apply(_d, [(_g.password = _h.sent(),
                        _g.fullName = fullName.toLocaleLowerCase(),
                        _g.dni = dni,
                        _g.urlImage = urlImage,
                        _g.created = new Date(Date.now()).toLocaleString("pe-PE"),
                        _g.roles = role,
                        _g)]);
                return [4 /*yield*/, userRepository.save(newUser)];
            case 13:
                results = _h.sent();
                return [2 /*return*/, res.status(201).send({ Message: "Se creó correctamente", results: results })];
            case 14: return [3 /*break*/, 16];
            case 15:
                error_2 = _h.sent();
                return [2 /*return*/, res.send(error_2.sqlMessage)];
            case 16: return [2 /*return*/];
        }
    });
}); };
exports.userCreate = userCreate;
//edit user
var userEdit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, fullName, dni, urlImage, roles, index /*solo para desarrollo*/, comparison, user, emailExists, dniExists, userRoles, _b, _c, role, roleYaExists, results, results, newRole, results, results, results, error_3;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: 
            //llamamos a la funcion para eliminar los roles que no estan siendo usados
            return [4 /*yield*/, (0, helpers_1.removeUnrelatedRoles)()];
            case 1:
                //llamamos a la funcion para eliminar los roles que no estan siendo usados
                _d.sent();
                _a = req.body, email = _a.email, password = _a.password, fullName = _a.fullName, dni = _a.dni, urlImage = _a.urlImage, roles = _a.roles, index = _a.index;
                comparison = true;
                return [4 /*yield*/, userRepository.find({
                        relations: { roles: true },
                        where: { user_id: parseInt(req.params.id) }
                    })];
            case 2:
                user = _d.sent();
                _d.label = 3;
            case 3:
                _d.trys.push([3, 32, , 33]);
                if (!(user.length > 0)) return [3 /*break*/, 30];
                return [4 /*yield*/, userRepository.createQueryBuilder("user")
                        .where("user.email=:email", { email: email })
                        .andWhere("user.user_id!=:user_id", { user_id: req.params.id }).getOne()];
            case 4:
                emailExists = _d.sent();
                return [4 /*yield*/, userRepository.createQueryBuilder("user")
                        .where("user.dni=:dni", { dni: dni })
                        .andWhere("user.user_id!=:user_id", { user_id: req.params.id }).getOne()];
            case 5:
                dniExists = _d.sent();
                if (!(emailExists !== null)) return [3 /*break*/, 6];
                return [2 /*return*/, res.status(409).send({ Message: "El email ya existe" })];
            case 6:
                if (!(dniExists !== null)) return [3 /*break*/, 7];
                return [2 /*return*/, res.status(409).send({ Message: "El dni ya existe" })];
            case 7:
                userRoles = user[0].roles;
                if (!(password !== user[0].password)) return [3 /*break*/, 12];
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user[0].password)];
            case 8:
                comparison = _d.sent();
                if (!(comparison !== true)) return [3 /*break*/, 10];
                _b = req.body;
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 9:
                _b.password = _d.sent();
                return [3 /*break*/, 12];
            case 10:
                _c = req.body;
                return [4 /*yield*/, user[0].password];
            case 11:
                _c.password = _d.sent();
                _d.label = 12;
            case 12:
                if (!(index !== null)) return [3 /*break*/, 26];
                if (!(typeof roles !== "object")) return [3 /*break*/, 25];
                return [4 /*yield*/, roleRepository.find({
                        where: { roleName: roles }
                    })
                    //si roles ya existe en la bd
                ];
            case 13:
                role = _d.sent();
                if (!(role.length > 0)) return [3 /*break*/, 19];
                roleYaExists = userRoles.filter(function (r) { return r.roleName === roles; });
                if (!(roleYaExists.length > 0)) return [3 /*break*/, 14];
                return [2 /*return*/, res.status(409).send({ Message: "el rol ya existe" })];
            case 14:
                if (!(roles.length === 0)) return [3 /*break*/, 16];
                userRoles.splice(index, 1);
                req.body.updated = new Date(Date.now()).toLocaleString("pe-PE");
                userRepository.merge(user[0], req.body);
                return [4 /*yield*/, userRepository.save(user)];
            case 15:
                results = _d.sent();
                if (user[0].user_id !== AuthMiddleware_1.deco[AuthMiddleware_1.deco.length - 1].userId) {
                    return [2 /*return*/, res.status(201).send({ loginAgain: false, Message: "Se editó correctamente", results: results })];
                }
                return [2 /*return*/, res.status(201).send({ loginAgain: true, Message: "Se editó correctamente, debe cerrar e iniciar nuevamente sesión", results: results })];
            case 16:
                //para reemplazar o agregar
                userRoles.splice(index, 1, role[0]);
                req.body.updated = new Date(Date.now()).toLocaleString("pe-PE");
                userRepository.merge(user[0], req.body);
                return [4 /*yield*/, userRepository.save(user)];
            case 17:
                results = _d.sent();
                if (user[0].user_id !== AuthMiddleware_1.deco[AuthMiddleware_1.deco.length - 1].userId) {
                    return [2 /*return*/, res.status(201).send({ loginAgain: false, Message: "Se editó correctamente", results: results })];
                }
                return [2 /*return*/, res.status(201).send({ loginAgain: true, Message: "Se editó correctamente, debe cerrar e iniciar nuevamente sesión", results: results })];
            case 18: return [3 /*break*/, 25];
            case 19:
                if (!(roles.length > 0)) return [3 /*break*/, 22];
                newRole = roleRepository.create({
                    roleName: roles,
                    created: new Date(Date.now()).toLocaleString("pe-PE")
                });
                return [4 /*yield*/, dataSource_1.myDataSource.manager.save(newRole)];
            case 20:
                _d.sent();
                userRoles.splice(index, 1, newRole);
                req.body.updated = new Date(Date.now()).toLocaleString("pe-PE");
                userRepository.merge(user[0], req.body);
                return [4 /*yield*/, userRepository.save(user)];
            case 21:
                results = _d.sent();
                if (user[0].user_id !== AuthMiddleware_1.deco[AuthMiddleware_1.deco.length - 1].userId) {
                    return [2 /*return*/, res.status(201).send({ loginAgain: false, Message: "Se editó correctamente", results: results })];
                }
                return [2 /*return*/, res.status(201).send({ loginAgain: true, Message: "Se editó correctamente, debe cerrar e iniciar nuevamente sesión", results: results })];
            case 22:
                if (!(index > userRoles.length - 1)) return [3 /*break*/, 23];
                return [2 /*return*/, res.status(400).send({ Message: "No hay rol que eliminar en esa posición" })];
            case 23:
                userRoles.splice(index, 1);
                req.body.updated = new Date(Date.now()).toLocaleString("pe-PE");
                userRepository.merge(user[0], req.body);
                return [4 /*yield*/, userRepository.save(user)];
            case 24:
                results = _d.sent();
                if (user[0].user_id !== AuthMiddleware_1.deco[AuthMiddleware_1.deco.length - 1].userId) {
                    return [2 /*return*/, res.status(201).send({ loginAgain: false, Message: "Se editó correctamente", results: results })];
                }
                return [2 /*return*/, res.status(201).send({ loginAgain: true, Message: "Se editó correctamente, debe cerrar e iniciar nuevamente sesión", results: results })];
            case 25: return [3 /*break*/, 29];
            case 26:
                if (!(fullName !== user[0].fullName ||
                    dni !== user[0].dni ||
                    email !== user[0].email ||
                    (urlImage !== undefined && urlImage !== user[0].urlImage) ||
                    (password !== user[0].password && comparison !== true))) return [3 /*break*/, 28];
                //editar tipicamente
                req.body.updated = new Date(Date.now()).toLocaleString("pe-PE");
                userRepository.merge(user[0], req.body);
                return [4 /*yield*/, userRepository.save(user)];
            case 27:
                results = _d.sent();
                if (user[0].user_id !== AuthMiddleware_1.deco[AuthMiddleware_1.deco.length - 1].userId) {
                    return [2 /*return*/, res.status(201).send({ loginAgain: false, Message: "Se editó correctamente", results: results })];
                }
                return [2 /*return*/, res.status(201).send({ loginAgain: true, Message: "Se editó correctamente, debe cerrar e iniciar nuevamente sesión", results: results })];
            case 28: return [2 /*return*/, res.send({ Message: "No hubo cambios" })];
            case 29: return [3 /*break*/, 31];
            case 30: return [2 /*return*/, res.status(400).send({ Message: "El usuario no existe o el 'id' no es válido" })];
            case 31: return [3 /*break*/, 33];
            case 32:
                error_3 = _d.sent();
                return [2 /*return*/, res.send(error_3.srlMessage)];
            case 33: return [2 /*return*/];
        }
    });
}); };
exports.userEdit = userEdit;
//user delete
var userRemove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            //llamamos a la funcion para eliminar los roles que no estan siendo usados
            return [4 /*yield*/, (0, helpers_1.removeUnrelatedRoles)()];
            case 1:
                //llamamos a la funcion para eliminar los roles que no estan siendo usados
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 8]);
                return [4 /*yield*/, userRepository.find({
                        relations: { roles: true },
                        where: { user_id: parseInt(req.params.id) }
                    })];
            case 3:
                user = _a.sent();
                if (!(user.length > 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, userRepository.delete(req.params.id)];
            case 4:
                results = _a.sent();
                if (results.affected === 1) {
                    if (user[0].user_id !== AuthMiddleware_1.deco[AuthMiddleware_1.deco.length - 1].userId) {
                        return [2 /*return*/, res.status(201).send({ loginAgain: false, Message: "Se editó correctamente", results: results })];
                    }
                    return [2 /*return*/, res.status(201).send({ loginAgain: true, Message: "Se editó correctamente, debe cerrar e iniciar nuevamente sesión", results: results })];
                }
                else {
                    return [2 /*return*/, res.send({ Message: "No se pudo eliminar" })];
                }
                return [3 /*break*/, 6];
            case 5: return [2 /*return*/, res.status(400).send({ Message: "El usuario no existe o el 'id' no es válido" })];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_4 = _a.sent();
                return [2 /*return*/, res.send(error_4.srlMessage)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.userRemove = userRemove;
