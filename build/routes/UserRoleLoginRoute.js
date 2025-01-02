"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controllers/UserController");
var UserMiddleware_1 = require("../middlewares/UserMiddleware");
var LoginController_1 = require("../controllers/LoginController");
var AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
var userRouter = (0, express_1.Router)();
//path user
userRouter.get("/users", AuthMiddleware_1.isLoggedIn, AuthMiddleware_1.isEmployee, UserController_1.userAll);
userRouter.get("/users/:id", AuthMiddleware_1.isLoggedIn, AuthMiddleware_1.isEmployee, UserController_1.userOne);
userRouter.post("/users", AuthMiddleware_1.isLoggedIn, AuthMiddleware_1.isAdmin, UserMiddleware_1.fieldUsers, UserMiddleware_1.passwordPost, UserMiddleware_1.rolesPost, UserController_1.userCreate);
userRouter.put("/users/:id", AuthMiddleware_1.isLoggedIn, AuthMiddleware_1.isAdmin, AuthMiddleware_1.doNotRemoveUserAdmin, UserMiddleware_1.fieldUsers, UserMiddleware_1.passwordPut, UserMiddleware_1.rolesPut, UserController_1.userEdit);
userRouter.delete("/users/:id", AuthMiddleware_1.isLoggedIn, AuthMiddleware_1.isAdmin, AuthMiddleware_1.doNotRemoveUserAdmin, UserController_1.userRemove);
//path login
userRouter.post("/login", LoginController_1.login);
exports.default = userRouter;
