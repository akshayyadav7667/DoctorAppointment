import Doctor from "../models/Doctor.js"
import User from '../models/User.js'
import Appointment from '../models/Appointment.js'
import { sendEmail } from "../utils/sendEmail.js";







export const applyDoctor = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);

    try {

        const existingDoctor = await Doctor.findOne({ user_Id: req.user.id });

        if (existingDoctor) {
            return res.status(400).json("Already applied as doctor");
        }

        const doctor = new Doctor({
            user_Id: req.user.id,
            // doctor_image: req.file?.path || "", 
            specialization: req.body.specialization,
            about: req.body.about,
            experience: req.body.experience,
            gender: req.body.gender,
            fees: req.body.fees,
            timings: req.body.timings,
            location: req.body.location,
            status: "pending"
        })

        // console.log(doctor);

        await doctor.save();



        res.status(200).json({ message: "Applied for the doctor", doctor });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}







// get profile Doctor

export const getDoctorProfile = async (req, res) => {
    try {
        // const doctorId = req.user?.id;

        const doctor = await Doctor.findOne({ user_Id: req.user?.id }).populate("user_Id", "-password");


        // console.log(doctor);
        if (doctor.status !== 'approved') {
            return res.status(403).json({ message: "Doctor not apporved yet" });
        }

        res.status(200).json({ message: "Doctor Profile ", doctor });


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
        const doctor = await Doctor.findOne({ user_Id: doctorUserId }).populate("user_Id", "name phone")
        console.log("doctor", doctor);

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found " });
        }

        const appointment = await Appointment.findOne({
            _id: appointmentId,
            doctor_Id: doctor._id,
        }).populate("user_Id", "email name")

        // console.log(appointment);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found !" });
        }

        appointment.status = status;
        await appointment.save();

        // console.log("appointment",appointment);


        if (status === 'confirmed') {
            const userEmail = appointment.user_Id.email;
            const username = appointment.user_Id.name;

            const subject = "Your Appointment is Confirmed";
            const message = `Hello ${username},\n\nYour appointment with Dr. ${doctor.user_Id.name} has been confirmed.\n Phone number :- ${doctor.user_Id.phone} \nThank you!`

            // console.log(userEmail);
            // console.log(username);
            // console.log(message);

            await sendEmail(userEmail, subject, message);
        }


        if (status === 'rejected') {
            const subject = "Your Appointment is Rejected";
            const message = `Hello ${username},\n\nWe regret to inform you that your appointment with Dr. ${doctor.user_Id.name} has been rejected.\nYou may book a new appointment at your convenience.\n\nThank you for using our service.`;
            await sendEmail(userEmail, subject, message);
        }

        // console.log(appointment);
        res.status(200).json({ message: "Appointment status changed" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }

}








// Doctor can see the requested appointment and confirmed appointment 

export const seeAppointmentDetails = async (req, res) => {

    const doctoruserId = req.user?.id;

    try {
        const doctor = await Doctor.findOne({ user_Id: doctoruserId });

        // console.log(doctor);

        const appointment = await Appointment.find({ doctor_Id: doctor._id }).populate("user_Id", "name, phone").sort({ createdAt: -1 });

        // console.log(appointment)


        res.status(200).json({ message: "Doctor see all Appointment ", appointment });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
}











// update doctor profile

export const updateDoctorProfile = async (req, res) => {
    const doctorUserId = req.user?.id;
    try {

        const { specialization, experience, fees, timings, location } = req.body;
        // console.log(doctorUserId);

        if (!fees || fees < 0) {
            return res.status(400).json({ message: "Invalid consultation fee" });
        }


        const doctor = await Doctor.findOneAndUpdate(
            { user_Id: doctorUserId },
            {
                specialization, experience, fees, timings, location
            },
            { new: true }

        )
        // const doctor = await Doctor.findOne({ user_Id: doctorUserId });
        // console.log(doctor);

        res.status(200).json({ message: "update the profile ", doctor })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}











// dashboard of the doctor 

export const doctorDashboard = async (req, res) => {
    const doctorUserId = req.user?.id;
    try {

        console.log(doctorUserId);
        const doctor = await Doctor.findOne({ user_Id: doctorUserId });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }


        const appointment = await Appointment.find({ doctor_Id: doctor._id }).populate("user_Id", "name email phone").sort({ createdAt: -1 });
        // console.log(appointment);
        const appovedAppointment = appointment.filter((app) => app.status === 'confirmed').length;
        const pendingAppointment = appointment.filter((app) => app.status === 'pending').length;
        const rejectAppointment = appointment.filter((app) => app.status === 'rejected').length;


        // console.log(appovedAppointment);
        // console.log(pendingAppointment);
        // console.log(rejectAppointment);



        res.status(200).json({
            message: "Dashboard of the doctor",
            totalAppointment: appointment.length,
            appovedAppointment,
            pendingAppointment,
            rejectAppointment
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
}




