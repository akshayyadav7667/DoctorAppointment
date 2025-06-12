
import express from 'express'
import { loginUser, registerUser, userProfile } from '../controllers/UserController.js';
import { authorizeRoles, ProtectedAuth } from '../middleware/Auth.js';
import { applyDoctor } from '../controllers/DoctorController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', ProtectedAuth, authorizeRoles("user", "doctor", "admin"), userProfile)
userRouter.post('/applyDoctor', ProtectedAuth, authorizeRoles('user'), applyDoctor)



export default userRouter;




