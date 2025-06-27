import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    doctor_image:{
        type:String
    },
    doctor_image_id:{
        type:String,
    },
    about:{
        type:Object,
        required:true
    },
    available:{
        type:Boolean,
        default: true,
    },
    appointment:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Appointment",
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        enum:['male', 'female','other'],
        required:true
    },
    fees: {
        type: Number,
        required: true,
    },
    timings: {
        type: Array,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    location: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Doctor = mongoose.model("Doctor",doctorSchema);

export default Doctor;