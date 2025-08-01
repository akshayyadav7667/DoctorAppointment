import React, { useState } from "react";

export default function FormApplyForDoctor() {
  const [formData, setFormData] = useState({
    user_Id: "684aa0886d2f9c8987737c8a",
    specialization: "",
    experience: "",
    fees: "",
    timings: ["", ""],
    status: "",
    location: "",
    about: "",
    available: false,
    doctor_image:
      "https://res.cloudinary.com/ddaufd3kl/image/upload/v1753973539/Doctors/doctor_sample.png",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleTimingChange = (index, value) => {
    const updatedTimings = [...formData.timings];
    updatedTimings[index] = value;
    setFormData((prev) => ({
      ...prev,
      timings: updatedTimings,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // TODO: send to backend
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Apply as a Doctor</h2>

        <div className="flex justify-center">
          <img
            src={formData.doctor_image}
            alt="Doctor"
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Gender</label>
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
            <label className="block mb-1 font-medium text-gray-700">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="e.g. MBBS, Cardiologist"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Experience (Years)</label>
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
            <label className="block mb-1 font-medium text-gray-700">Consultation Fee (₹)</label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="e.g. 500"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Adarsh Colony, Gaya"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="e.g. approved, pending"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Timing 1</label>
            <input
              type="text"
              value={formData.timings[0]}
              onChange={(e) => handleTimingChange(0, e.target.value)}
              placeholder="e.g. 9:00 AM - 1:00 PM"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Timing 2</label>
            <input
              type="text"
              value={formData.timings[1]}
              onChange={(e) => handleTimingChange(1, e.target.value)}
              placeholder="e.g. 4:00 PM - 8:00 PM"
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
            <label className="text-gray-700">Available for Appointments</label>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Write something about yourself..."
            required
            className="w-full border px-3 py-2 rounded-md h-24"
          />
        </div>


        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-2 rounded-full shadow-lg transition"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
