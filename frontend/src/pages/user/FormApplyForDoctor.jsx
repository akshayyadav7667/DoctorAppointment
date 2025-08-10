import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import header from "../../assets/header_img.png";
// import axios from "axios";
import toast from "react-hot-toast";
import axios from "axios";

export default function FormApplyForDoctor() {
  const {  userToken, backendUrl } = useContext(AuthContext);

  // const [isedit, setIsEdit] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    gender: "",
    specialization: "",
    experience: "",
    fees: "",
    location: "",
    available: false,
    about: "",
    doctor_image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // console.log(data);

      const res = await axios.post(`${backendUrl}/api/user/applyDoctor`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      toast.success(res.data.message || "Application submitted!");

      setFormData("");

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data || "Failed to submit application");
    }

    

    
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-tl  bg-orange-50 to-blue-50  py-5 px-4 flex flex-col justify-center items-center">
        <div className="py-5">
          <h2 className="text-3xl md:text-4xl font-bold text-center py-2 text-blue-700">
            Apply as a Doctor
          </h2>

          <p className="text-gray-700 text-center max-w-3xl mx-auto mt-3">
            Every patient deserves the right doctor. Every doctor deserves the
            right platform. Share your expertise, help more people, and grow
            your career — all from one place.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-5xl mb-10 bg-gray-50  rounded-md  p-8 space-y-6"
        >
          <div className="flex justify-center">
            <label htmlFor="image-upload" className="cursor-pointer">
              <img
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                src={
                  formData.doctor_image
                    ? URL.createObjectURL(formData.doctor_image)
                    : "https://via.placeholder.com/150"
                }
                alt="Doctor"
              />
            </label>
            <input
              id="image-upload"
              type="file"
              name="doctor_image"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Specialization
              </label>

              <select
                name="specialization"
                onChange={handleChange}
                value={formData.specialization}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Gynecologist">Gynecologist</option>
                <option value=" General physician">General physician</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value=" Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Experience (Years)
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 5"
                required
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Consultation Fee (₹)
              </label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="500"
                required
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder=" Adarsh Colony, Gaya"
                required
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label className="text-gray-700">
                Available for Appointments
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              About
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Write something about yourself..."
              required
              className="w-full border px-3 py-2 rounded-md h-40"
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-2 rounded-lg shadow transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col md:flex-row px-10 py-10 gap-6">
        {/* Left Section */}
        <div className="flex-1  rounded-md space-y-8 ">
          <div className="bg-blue-50 p-3">
            <h3 className="text-xl bg-blue-100 p-2 font-bold text-blue-900 mb-4">
              Why Join Our Platform?
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-800">
              <li>Expand your reach to thousands of patients in your city.</li>
              <li>Manage appointments and consultations online with ease.</li>
              <li>Increase your visibility with a verified doctor profile.</li>
              <li>Earn more by reaching patients beyond your locality.</li>
              <li>Be part of a trusted network of healthcare professionals.</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-3">
            <h3 className="text-xl bg-orange-100 p-2 font-bold text-orange-900 mb-4">
              How to Apply
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-800">
              <li>
                Fill out the application form above with accurate details.
              </li>
              <li>Upload a professional photo and add your credentials.</li>
              <li>Submit the form for review by our verification team.</li>
              <li>
                Wait for confirmation via email or phone within 2–3 business
                days.
              </li>
              <li>
                Once approved, start accepting patient appointments online.
              </li>
            </ol>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-6 bg-blue-100 rounded-tr-4xl  rounded-bl-4xl ">
          <img src={header} alt="" />
        </div>
      </div>
    </div>
  );
}
