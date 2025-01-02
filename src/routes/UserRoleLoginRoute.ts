import { Router } from "express";
import { userAll, userOne, userCreate, userEdit, userRemove } from "../controllers/UserController";
import { fieldUsers, passwordPost, passwordPut, rolesPost, rolesPut } from "../middlewares/UserMiddleware";
import { login } from "../controllers/LoginController";
import { doNotRemoveUserAdmin, isAdmin, isEmployee, isLoggedIn } from "../middlewares/AuthMiddleware";

const userRouter=Router()

//path user
userRouter.get("/users", isLoggedIn, isEmployee, userAll)
userRouter.get("/users/:id",isLoggedIn, isEmployee, userOne)
userRouter.post("/users", isLoggedIn,isAdmin, fieldUsers, passwordPost, rolesPost, userCreate)
userRouter.put("/users/:id", isLoggedIn, isAdmin, doNotRemoveUserAdmin, fieldUsers, passwordPut, rolesPut, userEdit)
userRouter.delete("/users/:id", isLoggedIn, isAdmin, doNotRemoveUserAdmin, userRemove)
//path login
userRouter.post("/login", login)

export default userRouter