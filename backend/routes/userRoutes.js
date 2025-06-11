
import express from 'express'
import { loginUser, registerUser, userProfile } from '../controllers/UserController.js';
import { authorizeRoles, ProtectedAuth } from '../middleware/Auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', ProtectedAuth, authorizeRoles("user", "doctor", "admin"), userProfile)



export default userRouter;




