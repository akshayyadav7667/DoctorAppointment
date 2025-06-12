import Doctor from "../models/Doctor.js"
import User from '../models/User.js'

export const applyDoctor = async (req, res) => {
    try {

        const existingDoctor = await Doctor.findOne({ user_Id: req.user.id });

        if (existingDoctor) {
            return res.status(400).json("Already applied as doctor");
        }

        const doctor = new Doctor({
            user_Id: req.user.id,
            specialization: req.body.specialization,
            experience: req.body.experience,
            fees: req.body.fees,
            timings: req.body.timings,
            location: req.body.location,
            status: "pending"
        })

        // console.log(doctor);

        await doctor.save();

        await User.findByIdAndUpdate(req.user.id, { role: "doctor" });

        // console.log("hello")

        res.status(200).json({ message: "Applied for the doctor", doctor });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}


// get profile Doctor

export const getDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.user?.id;

        const doctor= await Doctor.findOne({user_Id: req.user?.id}).populate("user_Id","-password");


        // console.log(doctor);
        if(doctor.status!=='approved')
        {
            return res.status(403).json({message:"Doctor not apporved yet"});
        }

        res.status(200).json({ doctor: "Doctor Profile ", doctor });


    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}



// Approve or reject the appointment
export const changeAppointmentStatus= async (req,res)=>{

    try {
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }

}

