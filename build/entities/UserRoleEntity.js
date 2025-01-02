"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Role = void 0;
var typeorm_1 = require("typeorm");
//Role
var Role = /** @class */ (function () {
    function Role() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Role.prototype, "role_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", unique: true, nullable: false, length: 16 }),
        __metadata("design:type", String)
    ], Role.prototype, "roleName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Role.prototype, "created", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], Role.prototype, "updated", void 0);
    Role = __decorate([
        (0, typeorm_1.Entity)({
            synchronize: true,
            orderBy: {
                role_id: "DESC",
                created: "DESC"
            }
        })
    ], Role);
    return Role;
}());
exports.Role = Role;
//user
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], User.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false, length: 64 }),
        __metadata("design:type", String)
    ], User.prototype, "fullName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", unique: true, length: 8 }),
        __metadata("design:type", String)
    ], User.prototype, "dni", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", unique: true, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true, length: 2083 }),
        __metadata("design:type", String)
    ], User.prototype, "urlImage", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "last_access", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "created", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "updated", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Role; }, {
            cascade: true
        }),
        (0, typeorm_1.JoinTable)({
            name: "user_role",
            joinColumn: {
                name: "userId",
                referencedColumnName: "user_id",
                foreignKeyConstraintName: "user_role_userId"
            },
            inverseJoinColumn: {
                name: "roleId",
                referencedColumnName: "role_id",
                foreignKeyConstraintName: "user_role_roleId"
            }
        }),
        __metadata("design:type", Array)
    ], User.prototype, "roles", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)({
            synchronize: true,
            orderBy: {
                user_id: "DESC",
                created: "DESC"
            }
        })
    ], User);
    return User;
}());
exports.User = User;
