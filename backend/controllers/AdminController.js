import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js'

// get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const doctor = await Doctor.find();
        // console.log(doctor);
        res.status(200).json({ "doctor": doctor })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
}



// approve and reject the doctors

export const changeDoctorStatus = async (req, res) => {
    try {
        const { doctorId, status } = req.body;

        console.log(doctorId, status);
        // const doctor= await Doctor.findById(doctorId);
        const doctor = await Doctor.findByIdAndUpdate(
            doctorId,
            {
                status
            },
            { new: true }
        )
        // console.log(doctor);

        res.status(200).json({ "find the doctor": doctor })
    } catch (error) {
        console.log(error);
        res.status({ message: error.message });

    }
}



// get all appointment
export const getAllAppointment=async(req,res)=>{
    const adminUserId= req.user?.id;
    try {
        const appointment= await Appointment.find().populate("user_Id","name phone").populate({path:"doctor_Id", populate:{path:"user_Id", select:"name specialization"}})
        // console.log(appointment);

        res.status(200).json({message:"All Appointment ",appointment});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message})
    }
}