
import Doctor from "../models/Doctor.js";
import Appointment from '../models/Appointment.js'



export const applyAppointment=async(req,res)=>{
    try {
        // const userId= req.user?.id;
        const {doctorId, time, date}= req.body

        const doctor= await Doctor.findById(doctorId);

        if(doctor.status!=='approved')
        {
            return res.status(404).json({message:"Doctor not avaliable !"})
        }

        const appointment= new  Appointment({
            user_Id: req.user?.id,
            doctor_Id: doctorId,
            time,
            date
        })
        // console.log(appointment);

        // console.log(doctor)
        await appointment.save();

        res.status(200).json({message:"Appointment to Doctor", appointment});


    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message})
    }
}