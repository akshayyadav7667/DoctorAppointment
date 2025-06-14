
import express from 'express'
import { CancelAppointment, getUserAppointments, loginUser, registerUser, addComments, userProfile, showAllDoctors } from '../controllers/UserController.js';
import { authorizeRoles, ProtectedAuth } from '../middleware/Auth.js';
import { applyDoctor } from '../controllers/DoctorController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', ProtectedAuth, authorizeRoles("user", "doctor", "admin"), userProfile)
userRouter.post('/applyDoctor', ProtectedAuth, authorizeRoles('user'), applyDoctor)

userRouter.get('/get-appointment', ProtectedAuth, authorizeRoles('user'), getUserAppointments)
userRouter.post('/cancel-appointment', ProtectedAuth, authorizeRoles('user'), CancelAppointment)

userRouter.post('/add-comments/:doctorId', ProtectedAuth, authorizeRoles('user'),addComments)

userRouter.get('/alldoctors',showAllDoctors)
export default userRouter;




