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
var express_1 = __importDefault(require("express"));
var dataSource_1 = require("./dataSource");
var UserRoleLoginRoute_1 = __importDefault(require("./routes/UserRoleLoginRoute"));
var UserRoleEntity_1 = require("./entities/UserRoleEntity");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
//estableciendo la coneccion con la base de datos
dataSource_1.myDataSource.initialize().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var roleRepository, userRepository, userList, newRole, newUser, _a, _b, app, PORT_1, app, PORT_2;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                roleRepository = dataSource_1.myDataSource.getRepository(UserRoleEntity_1.Role);
                userRepository = dataSource_1.myDataSource.getRepository(UserRoleEntity_1.User);
                return [4 /*yield*/, userRepository.find({ relations: { roles: true } })
                    //si no tenemos ningun registro de usuarios en la bd hacemos lo siguiente:
                ];
            case 1:
                userList = _d.sent();
                if (!(userList.length === 0)) return [3 /*break*/, 5];
                newRole = roleRepository.create({
                    roleName: 'admin',
                    created: new Date(Date.now()).toLocaleString("pe-PE")
                });
                return [4 /*yield*/, dataSource_1.myDataSource.manager.save(newRole)
                    //create user
                ];
            case 2:
                _d.sent();
                _b = (_a = userRepository).create;
                _c = {
                    fullName: 'clemente',
                    email: 'clem@gmail.com'
                };
                return [4 /*yield*/, bcryptjs_1.default.hash('Clem2024', 10)];
            case 3:
                newUser = _b.apply(_a, [(_c.password = _d.sent(),
                        _c.dni = '20418596',
                        _c.urlImage = 'http://mywebstarage/image',
                        _c.created = new Date(Date.now()).toLocaleString("pe-PE"),
                        _c.roles = [newRole],
                        _c)]);
                return [4 /*yield*/, userRepository.save(newUser)];
            case 4:
                _d.sent();
                console.log("Data Source se ha inicializado!");
                app = (0, express_1.default)();
                PORT_1 = process.env.PORT || 3000;
                //middlewares
                app.use((0, cors_1.default)());
                app.use(body_parser_1.default.json());
                //paths
                app.use(UserRoleLoginRoute_1.default);
                //inicio del servidor
                app.listen(PORT_1, function () {
                    console.log("El servidor está escuchando en el puerto" + " " + PORT_1);
                });
                return [3 /*break*/, 6];
            case 5:
                console.log("Data Source se ha inicializado!");
                app = (0, express_1.default)();
                PORT_2 = process.env.PORT || 3000;
                //middlewares
                app.use((0, cors_1.default)());
                app.use(body_parser_1.default.json());
                //paths
                app.use(UserRoleLoginRoute_1.default);
                //inicio del servidor
                app.listen(PORT_2, function () {
                    console.log("El servidor está escuchando en el puerto" + " " + PORT_2);
                });
                _d.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); }).catch(function (err) {
    console.log("Error durante la conección a la base de datos", err);
});
