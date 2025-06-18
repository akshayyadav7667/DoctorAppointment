import React from "react";
import { specialityData } from "../assets/assets";
import { doctors } from "../assets/assets";
import { NavLink } from "react-router-dom";

export default function Doctors() {
  return (
    <div className="flex flex-col md:flex-row h-full ">

      <div className="w-full md:w-3/12 lg:w-2/9 p-4">
        <div className="flex flex-col  items-start space-y-2">
          {specialityData.map((item) => (
            <NavLink className="bg-blue-50  hover:bg-blue-200 rounded w-full text-sm px-5 py-2">
              {item.speciality}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="w-full  md:w-9/12  lg:w-7/9 ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-3  ">
          {doctors.map((item) => (
            <div className="flex   flex-col bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-300 m-10 md:m-2 ">
              <img src={item.image} alt="" className="bg-blue-50 w-full rounded-t-2xl border-0  hover:bg-blue-500 transition-all duration-300 " />
              <div className="flex flex-col justify-between  w-full  items-center p-8 md:p-3">
                <h2 className="font-semibold text-lg text-blue-500">{item.name}</h2>
                <div className="flex mt-2 justify-around w-full">
                  <span className="font-semibold text-gray-700">{item.speciality}</span>
                  <span className="text-gray-700 font-semibold"> {item.degree}</span>
                </div>
                <div className="flex mt-2 w-full justify-around">
                  <span className="text-green-500 font-semibold">Avaliable</span>
                  <span>{item.experience}</span>
                  <span className="text-green-600 font-bold">{item.fees}Rs</span>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}
