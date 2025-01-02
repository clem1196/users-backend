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
exports.doNotRemoveUserAdmin = exports.isEmployee = exports.isAdmin = exports.isLoggedIn = exports.deco = void 0;
var dataSource_1 = require("../dataSource");
var UserRoleEntity_1 = require("../entities/UserRoleEntity");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var roleRepository = dataSource_1.myDataSource.getRepository(UserRoleEntity_1.Role);
var userRepository = dataSource_1.myDataSource.getRepository(UserRoleEntity_1.User);
//decoded token
exports.deco = [];
//authentication
var isLoggedIn = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, result;
    return __generator(this, function (_a) {
        token = req.headers.authorization;
        if (token === undefined) {
            return [2 /*return*/, res.status(401).send({ Message: "El token no es válido o no existe" })];
        }
        else {
            result = token.split(' ');
            if (result.length > 1) {
                token = result[1];
                jsonwebtoken_1.default.verify(token, "clemente", function (err, decoded) {
                    if (err)
                        return res.status(401).send({ Message: "No se pudo verificar el token", ok: false, err: err });
                    exports.deco.push(decoded);
                    return next();
                });
            }
            else {
                token = result[0];
                jsonwebtoken_1.default.verify(token, "clemente", function (err, decoded) {
                    if (err)
                        return res.status(401).send({ Message: "No se pudo verificar el token", ok: false, err: err });
                    exports.deco.push(decoded);
                    return next();
                });
            }
        }
        return [2 /*return*/];
    });
}); };
exports.isLoggedIn = isLoggedIn;
//authorization
var isAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var roleUser;
    return __generator(this, function (_a) {
        roleUser = exports.deco[exports.deco.length - 1].role.filter(function (ro) { return ro.roleName !== null && ro.roleName === "admin"; });
        if (roleUser.length === 0) {
            return [2 /*return*/, res.status(401).send({ Message: "usted no tiene permiso" })];
        }
        else {
            return [2 /*return*/, next()];
        }
        return [2 /*return*/];
    });
}); };
exports.isAdmin = isAdmin;
var isEmployee = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var roleUser;
    return __generator(this, function (_a) {
        roleUser = exports.deco[exports.deco.length - 1].role.filter(function (ro) { return ro.roleName !== null && (ro.roleName === "employee" || ro.roleName === "admin"); });
        if (roleUser.length === 0) {
            return [2 /*return*/, res.status(401).send({ Message: "usted no tiene permiso" })];
        }
        else {
            return [2 /*return*/, next()];
        }
        return [2 /*return*/];
    });
}); };
exports.isEmployee = isEmployee;
//El sistema necesita siempre de un usuario administrador por lo que no se puede eliminar ni editar
var doNotRemoveUserAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, numberRoleAdmin, userToDelete, userResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, userRepository.find({
                        relations: { roles: true },
                        where: { roles: { roleName: "admin" } }
                    })];
            case 1:
                numberRoleAdmin = _a.sent();
                return [4 /*yield*/, userRepository.find({
                        relations: { roles: true },
                        where: { user_id: id }
                    })];
            case 2:
                userToDelete = _a.sent();
                if (userToDelete.length === 0) {
                    return [2 /*return*/, res.status(400).send({ Message: "El usuario no existe o no es válido", ok: false })];
                }
                else {
                    userResult = userToDelete[0].roles.filter(function (ur) { return ur.roleName !== null && ur.roleName === "admin"; });
                    if (userResult.length > 0 && numberRoleAdmin.length < 2) {
                        return [2 /*return*/, res.status(400).send({ Message: "El usuario 'admin' no puede ser eliminado ni editado", ok: false })];
                    }
                    else {
                        return [2 /*return*/, next()];
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
exports.doNotRemoveUserAdmin = doNotRemoveUserAdmin;
