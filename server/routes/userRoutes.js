import express from "express"
import userController from "../controller/userController.js"
const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getOneUser);
router.post("/user", userController.addUser);

export default router;