import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Appointment from '../models/Appointment.js'




export const registerUser = async (req, res) => {


    const { name, email, password, phone, dob, gender, address, role } = req.body;
    // console.log(req.body)

    try {

        if (!email || !name || !password || !phone || !dob || !gender || !address) {
            return res.status(400).json({ message: "Fill the details completely !" });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // console.log(hashedPassword);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            dob,
            gender,
            address,
            role
        })


        await newUser.save();

        res.status(201).json({ message: "User data", newUser })


    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json("Invalid Credentials");
        }

        const user = await User.findOne({ email })
        // console.log(user)

        if (!user) {
            return res.status(400).json("User is not found !");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json("Invalid crenditails");
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d"
            }
        );


        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });



        // console.log(email, password)
        // res.status(200).json({ message: "User is found", others });

    } catch (error) {
        console.log(error);
        res.status(400).json({ errror: error.message });
    }
}


// get the profile

export const userProfile= async(req,res)=>{
    try {
        
        const id= req.user?.id;

        // console.log(req.user)

        if(!id)
        {
            return res.status(404).json("Page is not found !");
        }

        const userProfile = await User.findById(id);
        // console.log(userProfile)

        if(!userProfile)
        {
            return res.status(404).json("User profile not found !");
        }

        const {password,...others}= userProfile.toObject();



        res.status(200).json({message:"user profile", others});


    } catch (error) {
        console.log(error);
        res.status(400).json({ errror: error.message });
        
    }
}



// get the appointment status

export const getUserAppointments= async(req,res)=>{
    const userId= req.user?.id

    try {
        const appointment = await Appointment.find({user_Id: userId}).populate("user_Id","name phone").populate("doctor_Id","specialization experience").sort({createdAt:-1});
        // console.log(appointment)
        // console.log(userId);
        res.status(200).json({message:"User details",appointment});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message});
    }
}


//  cancel the appointment 
export const CancelAppointment=async(req,res)=>{
    const userId= req.user?.id;

    const {appointmentId, status}= req.body;


    try {
        const appointment = await Appointment.findOne({_id: appointmentId, user_Id:userId})

        // console.log(appointment);

        if(!appointment)
        {
            return res.status(404).json({message:"Appointment not found "});
        }

        // console.log(appointmentId, status);
        appointment.status=status


        await appointment.save();


        // console.log(appointment)

        res.status(200).json({message:"Cancel the appointment",appointment});

    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message})
    }
}