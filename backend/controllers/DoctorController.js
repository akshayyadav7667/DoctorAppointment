import Doctor from "../models/Doctor.js"
import User from '../models/User.js'
import Appointment from '../models/Appointment.js'

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

        const doctor = await Doctor.findOne({ user_Id: req.user?.id }).populate("user_Id", "-password");


        // console.log(doctor);
        if (doctor.status !== 'approved') {
            return res.status(403).json({ message: "Doctor not apporved yet" });
        }

        res.status(200).json({ doctor: "Doctor Profile ", doctor });


    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}



// Approve or reject the appointment
export const changeAppointmentStatus = async (req, res) => {
    const doctorUserId = req.user?.id;
    const { appointmentId, status } = req.body;
    // console.log()

    try {

        // console.log(doctorUserId)
        const doctor = await Doctor.findOne({ user_Id: doctorUserId })
        // console.log(doctor);

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found " });
        }

        const appointment = await Appointment.findOne({
            _id: appointmentId,
            doctor_Id: doctor._id,
        })

        // console.log(appointment);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found !" });
        }

        appointment.status = status;
        await appointment.save();
        // console.log(appointment);


        res.status(200).json({ message: "Appointment status changed" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }

}

