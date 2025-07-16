// import { InstagramIcon, ScanFaceIcon } from 'lucide-react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa6";
import React from "react";

export default function Footer() {
  return (
    <div className=" bg-gray-800  text-gray-200 text-sm">
     
      <div className=" flex flex-col  md:flex-row px-10 py-8">
        <div className="flex-3/5 space-y-4 ">
          <h3 className="text-lg  md:text-xl  lg:text-2xl ">
            Sign up for our free Good Health Newsletter
          </h3>
          <p className="text-sm md:text-lg lg:text-xl ">
            Get wellness tips to help you live happier and healthier
          </p>
          <div>
            <input
              type="text"
              placeholder="Enter your email address"
              className="px-4 py-2 md:px-4 md:py-3 border-0 w-[220px] md:w-[320px] lg:w-[350px] bg-white text-gray-700 mt-4 "
            />
            <button className="py-2 px-2 md:px-4 md:py-3 w-[90px] md:w-[120px] lg:w-[140px] bg-yellow-500 border-0 text-gray-700 font-semibold cursor-pointer">
              Submit
            </button>
          </div>
        </div>
        <div className="flex-2/5 flex justify-around md:justify-between mt-4">
          <div className="  space-y-4 mt-5 ">
            <h3>Follow WebMD on Social Media</h3>
            <div className="flex gap-4 text-xl mt-4 md:text-2xl lg:text-3xl">
              <FaInstagram className="text-pink-500" />
              <FaFacebook className="text-blue-500" />
              <FaYoutube className="text-red-500" />
              <FaWhatsapp className="text-green-500" />
            </div>
          </div>
          <div className=" mt-5  space-y-4">
            <h3 className="text-sm md:text-lg lg:text-xl">
              Download WebMD App
            </h3>
            <p className="flex gap-4 text-xl md:text-2xl lg:text-3xl">
              <FaPlay className="text-violet-200" />
              <FaCcApplePay className="text-cyan-400 " />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
