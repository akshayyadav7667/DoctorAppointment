import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js'
import User from '../models/User.js'
// import Appointment from '../models/Appointment.js'




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
export const getAllAppointment = async (req, res) => {
    const adminUserId = req.user?.id;
    try {
        const appointment = await Appointment.find().populate("user_Id", "name phone").populate({ path: "doctor_Id", populate: { path: "user_Id", select: "name specialization" } })
        // console.log(appointment);

        res.status(200).json({ message: "All Appointment ", appointment });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
}


export const getDetails = async (req, res) => {
    try {
        const doctor = await Doctor.find();
        const user = await User.find({ role: "user" });
        const appointment = await Appointment.find();

        // console.log(doctor.length);
        // console.log(user.length);
        // console.log(appointment.length);



        const pendingDoctors = doctor.filter((doc) => doc.status === 'pending');
        const approvedDoctor = doctor.filter((doc) => doc.status === 'approved');
        const rejectedDoctor = doctor.filter((doc) => doc.status === 'rejected');
        const pendingAppointment = appointment.filter((app) => app.filter === 'pending');
        const confirmedAppointment = appointment.filter((app) => app.filter === 'confirmed');
        const rejectedAppointment = appointment.filter((app) => app.filter === 'rejected');




        res.status(200).json({
            message: "Admin dashboard",
            user: user.length,
            pendingDoctors: pendingDoctors.length,
            approvedDoctor: approvedDoctor.length,
            rejectedDoctor: rejectedDoctor.length,
            pendingAppointment: pendingAppointment.length,
            confirmedAppointment: confirmedAppointment.lenght,
            rejectedAppointment: rejectedAppointment.length,

        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}