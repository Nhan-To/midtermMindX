import express from "express";
import {createUser, getAllUsers, getUserByName, updateUser, deleteUser} from "../controllers/User.js"

const userRouter = express.Router();

userRouter.route('/').post(createUser)
                     .get(getAllUsers);
                    
userRouter.route('/:name').get(getUserByName)
                          .put(updateUser)
                          .delete(deleteUser);

export { userRouter };