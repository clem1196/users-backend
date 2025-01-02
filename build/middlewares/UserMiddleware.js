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
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesPut = exports.rolesPost = exports.passwordPut = exports.passwordPost = exports.fieldUsers = void 0;
var dataSource_1 = require("../dataSource");
var UserRoleEntity_1 = require("../entities/UserRoleEntity");
var userRepository = dataSource_1.myDataSource.getRepository(UserRoleEntity_1.User);
//expresiones regulares
var emailRegex = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
var passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
var roleNameRegex = /^[a-zA-Z]{3,16}$/;
var dniRegex = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/;
var namesRegex = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]{3,64}$/; /*solo letras y espacios*/
//VALIDACION DE LOS CAMPOS DE USERS
var fieldUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, fullName, dni;
    return __generator(this, function (_b) {
        _a = req.body, email = _a.email, fullName = _a.fullName, dni = _a.dni;
        //Email
        if (email === undefined || email.length === 0) {
            return [2 /*return*/, res.status(400).send({ Message: "El 'email' es requerido" })];
        }
        else if (!emailRegex.test(email)) {
            return [2 /*return*/, res.status(400).send({ Message: "El 'email' no es válido" })];
        }
        //dni
        else if (dni === undefined || dni.length === 0) {
            return [2 /*return*/, res.status(400).send({ Message: "El 'dni' es requerido" })];
        }
        else if (!dniRegex.test(dni)) {
            return [2 /*return*/, res.status(400).send({ Message: "El 'dni' no es válido" })];
        }
        //fullName
        else if (fullName === undefined || fullName.length === 0) {
            return [2 /*return*/, res.status(400).send({ Message: "El campo 'fullName' es requerido" })];
        }
        else if (!namesRegex.test(fullName)) {
            return [2 /*return*/, res.status(400).send({ Message: "Ingrese en 'fullname' solo espacios y letras mínimo 3 y máximo 64" })];
        }
        else {
            return [2 /*return*/, next()];
        }
        return [2 /*return*/];
    });
}); };
exports.fieldUsers = fieldUsers;
//password create
var passwordPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var password;
    return __generator(this, function (_a) {
        password = req.body.password;
        if (password === undefined || password.length === 0) {
            return [2 /*return*/, res.status(400).send({ Message: "El 'password' es requerido" })];
        }
        else if (!passwordRegex.test(password)) {
            return [2 /*return*/, res.status(400).send({ Message: "Ingrese en 'password' entre 8 y 16 caracteres y al menos un caracter numerico\n            y un letra myuscula"
                })];
        }
        else {
            return [2 /*return*/, next()];
        }
        return [2 /*return*/];
    });
}); };
exports.passwordPost = passwordPost;
// password edit
var passwordPut = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var password, pass;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = req.body.password;
                return [4 /*yield*/, userRepository.find({ where: { user_id: parseInt(req.params.id) } })];
            case 1:
                pass = _a.sent();
                if (password === pass[0].password) {
                    return [2 /*return*/, next()];
                }
                else if (password === undefined || password.length === 0) {
                    return [2 /*return*/, res.status(400).send({ Message: "El 'password' es requerido" })];
                }
                else if (!passwordRegex.test(password)) {
                    return [2 /*return*/, res.status(400).send({ Message: "Ingrese en 'password' entre 8 y 16 caracteres y al menos un caracter numerico\n            y un letra myuscula" })];
                }
                else {
                    return [2 /*return*/, next()];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.passwordPut = passwordPut;
//roles create
var rolesPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var roles;
    return __generator(this, function (_a) {
        roles = req.body.roles;
        if (roles === undefined || roles.length === 0) {
            return [2 /*return*/, res.status(400).send({ Message: "El 'rol' es requerido" })];
        }
        else if (roles !== undefined && roles.length > 0 && !roleNameRegex.test(roles)) {
            return [2 /*return*/, res.status(400).send({ Message: "Ingrese 'roles' minimo 3 o maximo 16 caracteeres solo letras " })];
        }
        else {
            return [2 /*return*/, next()];
        }
        return [2 /*return*/];
    });
}); };
exports.rolesPost = rolesPost;
//roles edit
var rolesPut = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var roles;
    return __generator(this, function (_a) {
        roles = req.body.roles;
        if (typeof roles === "object") {
            return [2 /*return*/, next()];
        }
        else if (roles !== undefined && roles.length > 0 && !roleNameRegex.test(roles)) {
            return [2 /*return*/, res.status(400).send({ Message: "Ingrese en 'roles' minimo 3 o maximo 16 caracteeres solo letras" })];
        }
        else {
            return [2 /*return*/, next()];
        }
        return [2 /*return*/];
    });
}); };
exports.rolesPut = rolesPut;
