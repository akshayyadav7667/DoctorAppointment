import Doctor from "../models/Doctor.js"


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

        console.log(doctor);

        await doctor.save();
        // console.log("hello")

        res.status(200).json({message:"Applied for the doctor", doctor});

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}