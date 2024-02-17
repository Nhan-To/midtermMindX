import express from "express";
import {createUser, getAllUsers, getUserByName, updateUser, deleteUser} from "../controllers/User.js"
import { authMiddleware, authoMiddleware } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.route('/').post(createUser)
                     .get(authMiddleware, getAllUsers);
                    
userRouter.route('/:name').get(authMiddleware, getUserByName)
                          .put(authoMiddleware, updateUser)
                          .delete(authoMiddleware, deleteUser);

export { userRouter };