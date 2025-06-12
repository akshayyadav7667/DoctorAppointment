import Doctor from '../models/Doctor.js';


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



