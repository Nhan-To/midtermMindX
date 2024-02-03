import express from "express";
import {createUser} from "../controllers/User.js"

const userRouter = express.Router();

userRouter.route('/post').post(createUser);

export { userRouter };