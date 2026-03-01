import express from "express";
import { verifyToken, authorizeRoles, hasPermission, checkHierarchy } from "../middlerware/auth.js"; // note .js extension
import { deleteUserById, getUserById, getUsers, userLogin, userPermissionChange, userRegister, userRoleChange, userStatusChange, userUpdate } from "../controllers/UserController.js";


const router = express.Router();

// console.log("UserRoutes loaded");

router.post("/registerUser", verifyToken, authorizeRoles("super_admin", "admin"), hasPermission("create_user"), userRegister);

router.post("/login", userLogin);

router.get("/users", verifyToken, authorizeRoles("super_admin", "admin"), getUsers);

router.get("/employee/:id", verifyToken, authorizeRoles("super_admin", "admin", "employee"), getUserById);

router.post("/deleteUser/:id", verifyToken, authorizeRoles("super_admin", "admin"), checkHierarchy, deleteUserById);

router.post("/userStatusChange/:id", verifyToken, authorizeRoles("super_admin", "admin"), checkHierarchy, userStatusChange);

router.post("/userRoleChange/:id", verifyToken, authorizeRoles("super_admin", "admin"), checkHierarchy, userRoleChange)

router.post("/userPermissionChange/:id", verifyToken, authorizeRoles("super_admin", "admin"), checkHierarchy, userPermissionChange)

router.put("/userUpdate/:id", verifyToken, authorizeRoles("super_admin", "admin", "manager", "employee"), checkHierarchy, userUpdate);



export default router;