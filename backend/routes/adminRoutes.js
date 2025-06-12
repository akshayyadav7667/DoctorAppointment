import express from 'express';
import { authorizeRoles, isAdmin, ProtectedAuth } from '../middleware/Auth.js';
import { changeDoctorStatus, getAllDoctors } from '../controllers/AdminController.js';

const adminRouter= express.Router();

adminRouter.get('/doctors',ProtectedAuth, authorizeRoles('admin'), getAllDoctors );
adminRouter.post('/approve-doctor',ProtectedAuth, isAdmin, changeDoctorStatus)

export default adminRouter;

