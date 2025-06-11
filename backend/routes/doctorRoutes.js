
import express from 'express';
import { ProtectedAuth } from '../middleware/Auth.js';
import { applyDoctor } from '../controllers/DoctorController.js';

const doctorRoutes=express.Router();


doctorRoutes.post('/apply',ProtectedAuth, applyDoctor)


export default doctorRoutes;