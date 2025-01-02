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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUnrelatedRoles = void 0;
var dataSource_1 = require("../dataSource");
var UserRoleEntity_1 = require("../entities/UserRoleEntity");
var roleRepository = dataSource_1.myDataSource.getRepository(UserRoleEntity_1.Role);
var userRepository = dataSource_1.myDataSource.getRepository(UserRoleEntity_1.User);
//funcion que eliminará los roles que no se están usando
var removeUnrelatedRoles = function () { return __awaiter(void 0, void 0, void 0, function () {
    var userList, roleList, rolesRelacionados_1, index, element, index_1, elem, verify_1, rolesNoRelacionados, index, element;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userRepository.find({ relations: { roles: true } })];
            case 1:
                userList = _a.sent();
                if (!(userList.length > 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, roleRepository.find()
                    //obteniendo los roles que se están usando
                ];
            case 2:
                roleList = _a.sent();
                rolesRelacionados_1 = [];
                for (index = 0; index < userList.length; index++) {
                    element = userList[index].roles;
                    for (index_1 = 0; index_1 < element.length; index_1++) {
                        elem = element[index_1];
                        rolesRelacionados_1.push(elem);
                    }
                }
                verify_1 = {};
                rolesRelacionados_1 = rolesRelacionados_1.filter(function (r) { return verify_1[r.roleName] ? false : verify_1[r.roleName] = true; });
                rolesNoRelacionados = roleList.reduce(function (previous, current) {
                    var item = rolesRelacionados_1.find(function (x) { return x.roleName === current.roleName && x.role_id === current.role_id; });
                    if (!item)
                        previous = __spreadArray(__spreadArray([], previous, true), [current], false);
                    return previous;
                }, []);
                if (!(rolesNoRelacionados.length > 0)) return [3 /*break*/, 6];
                index = 0;
                _a.label = 3;
            case 3:
                if (!(index < rolesNoRelacionados.length)) return [3 /*break*/, 6];
                element = rolesNoRelacionados[index].role_id;
                return [4 /*yield*/, roleRepository.delete(element)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                index++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.removeUnrelatedRoles = removeUnrelatedRoles;
