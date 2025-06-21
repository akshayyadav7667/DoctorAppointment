import { specialityData } from "../assets/assets";
import { doctors } from "../assets/assets";
import { NavLink,useNavigate  } from "react-router-dom";

export default function Doctors() {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row h-full ">

      <div className="w-full md:w-3/12 lg:w-2/9 p-4">

        <div className="flex flex-col  items-start space-y-2">
          {specialityData.map((item) => (
            <NavLink key={item.name}  className="bg-blue-50  hover:bg-blue-200 rounded w-full text-sm px-5 py-2">
              {item.speciality}
            </NavLink>
          ))}
        </div>

      </div>

      <div className="w-full  md:w-9/12  lg:w-7/9 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-3  ">
          {doctors.map((item) => (
            <div className="flex  flex-col bg-blue-50 hover:bg-blue-100 rounded-xl transition-all cursor-pointer duration-300 m-10 md:m-2 " onClick={()=>navigate(`/doctors/${item._id}`)}>
              <img src={item.image} alt="" className="bg-blue-50 w-full rounded-t-2xl border-0  hover:bg-blue-500 transition-all duration-300 " />
              <div className="flex flex-col justify-between  w-full  items-center p-6 md:p-3">
                <h2 className="font-semibold text-lg text-blue-600">{item.name}</h2>
                <div className="flex mt-2 justify-around w-full">
                  <span className="font-semibold text-sm  text-gray-700">{item.speciality}</span>
                  <span className="text-gray-700 text-sm font-semibold"> {item.degree}</span>
                </div>
                <div className="flex mt-2 w-full justify-around">
                  <span className="text-green-500 font-semibold">Avaliable</span>
                  <span className="text-sm ">{item.experience}</span>
                  <span className="text-green-600 text-sm  font-bold">{item.fees}Rs</span>
                </div>
                <button className="mt-4 mb-4 cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm transition-all duration-300">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}
