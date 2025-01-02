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
exports.login = void 0;
var dataSource_1 = require("../dataSource");
var UserRoleEntity_1 = require("../entities/UserRoleEntity");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userRepository = dataSource_1.myDataSource.getRepository(UserRoleEntity_1.User);
//login
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, users, comparison, token, results, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, userRepository.find({
                        relations: { roles: true },
                        where: { email: email }
                    })
                    //verificamos si email existe en la base de datos
                ];
            case 2:
                users = _b.sent();
                //verificamos si email existe en la base de datos
                if (users.length === 0)
                    return [2 /*return*/, res.status(404).send({ Message: "el usuario no existe" })
                        //verificamos que el password es lo mismo que la base de datos
                    ];
                return [4 /*yield*/, bcryptjs_1.default.compare(password, users[0].password)];
            case 3:
                comparison = _b.sent();
                if (comparison !== true)
                    return [2 /*return*/, res.status(404).send({ Message: "La contraseña es incorrecto" })
                        //chequeamos que el usuario esté asignado al menos un rol
                    ];
                //chequeamos que el usuario esté asignado al menos un rol
                if (users[0].roles.length === 0)
                    return [2 /*return*/, res.status(400).send({ Message: "El usuario no tiene un rol asignado" })
                        //creamos el token y la firma
                    ];
                token = jsonwebtoken_1.default.sign({
                    userId: users[0].user_id,
                    email: users[0].email,
                    fullName: users[0].fullName,
                    role: users[0].roles
                }, "clemente", {
                    expiresIn: "1d"
                });
                //actualizamos el campo last_access
                users[0].last_access = new Date(Date.now()).toLocaleString("pe-PE");
                return [4 /*yield*/, userRepository.save(users)];
            case 4:
                results = _b.sent();
                return [2 /*return*/, res.status(200).send({ Message: "Logged In", token: token, results: results })];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
