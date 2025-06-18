import React from "react";
import image from "../assets/appointment_img.png";
export default function Register() {
  return (
    <div className="h-full">
      <div className="flex flex-col lg:flex-row h-full ">
        {/* left */}
        <div className="flex flex-1 flex-col items-center justify-center p-4">
          <h2 className="text-5xl mb-8 text-[#E44400] font-semibold ">
            Register{" "}
          </h2>
          <p className="mb-5 text-gray-500 text-sm leading-tight">Our healthcare specialist staff will respond within 24 hours</p>
          <form className="flex flex-col gap-3 w-full max-w-md px-4 ">
            <div className="flex flex-col  ">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className=" w-full border border-gray-300  roundborder-gray-300 rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className="border  w-full border-gray-300 rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your Email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                className="border  w-full border-gray-300 rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your Phone"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Gender</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1">
                  <input type="radio" name="gender" value="male" />
                  Male
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="gender" value="female" />
                  Female
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="gender" value="other" />
                  Other
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="dob">DOB</label>
              <input
                type="date"
                id="dob"
                className="border  w-full border-gray-300 rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your Dob"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address">Address</label>
              <textarea
                type="text"
                rows="4"
                id="address"
                placeholder="Enter your Address"
                className="w-full border border-gray-200 rounded-xl  p-2  focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button className="w-full mb-8 p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 cursor-pointer ">
              Submit
            </button>
          </form>
        </div>
        {/* left end  */}

        {/* right start */}

        <div className="flex-1 flex justify-center rounded-tl-full  bg-blue-500">
          <img src={image} alt="" className=" w-full max-w-md object-contain" />
        </div>

        {/* right  end */}
      </div>
    </div>
  );
}
