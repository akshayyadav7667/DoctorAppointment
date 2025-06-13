import express from 'express';
import { authorizeRoles, isAdmin, ProtectedAuth } from '../middleware/Auth.js';
import { changeDoctorStatus, getAllAppointment, getAllDoctors } from '../controllers/AdminController.js';

const adminRouter= express.Router();

adminRouter.get('/doctors',ProtectedAuth, authorizeRoles('admin'), getAllDoctors );
adminRouter.post('/approve-doctor',ProtectedAuth, isAdmin, changeDoctorStatus);
adminRouter.get('/all-appointments', ProtectedAuth, authorizeRoles('admin'), getAllAppointment)

export default adminRouter;

