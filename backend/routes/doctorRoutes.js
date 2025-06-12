
import express from 'express';
import { authorizeRoles, ProtectedAuth } from '../middleware/Auth.js';
import { getDoctorProfile } from '../controllers/DoctorController.js';
// import { authorizeRoles, ProtectedAuth } from '../middleware/Auth.js';
// import { applyDoctor } from '../controllers/DoctorController.js';

const doctorRoutes=express.Router();

doctorRoutes.get('/profile', ProtectedAuth, authorizeRoles('doctor'), getDoctorProfile)


export default doctorRoutes;