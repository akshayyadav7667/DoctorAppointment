import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, doctors } from "../assets/assets";

export default function SingleDoctor() {
  const { docId } = useParams();

  const [docInfo, setDocInfo] = useState(null);
   const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

   const daysofWeek = ["SUN", "MON", "TUE", "WEB", "THU", "FRI", "SAT"];

  const fetchDocInfo = async () => {
    const docInfo = await doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };


  const getAvailableSlot=async()=>{
    setDocSlots([]);
    // Getting data with index;

    let today= new Date();

    // console.log(today)

    for(let i=0;i<7;i++)
    {
      //getingh date with index

      let currentDate= new Date(today);

      currentDate.setDate(today.getDate()+i);

      // setting end time of the date with index 

      let endTime= new Date();
      endTime.setDate(today.getDate()+i);
      endTime.setHours(21,0,0,0);

      // console.log(endTime)


      // Setting hours

      if(today.getDate()===currentDate.getDate())
      {
          currentDate.setHours(
            currentDate.getHours() > 10 ? currentDate.getHours()+1 : 10
          );

          currentDate.setMinutes(currentDate.getMinutes()>30 ? 30 :0);
      }
      else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }



      let timeSlots=[];

      while(currentDate< endTime)
      {
        let formattedTime= currentDate.toLocaleDateString([],{
          hour:"2-digit",
          minute:"2-digit",
        })

        // login to hide the booked appointment

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();


        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;


        const isSlotAvilabe= docInfo.slots_booked[slotDate]

        // console.log(formateedTime)
      }


      // console.log(currentDate);
    }

  }


  const bookAppointment=async()=>{
    
    try {
      
    } catch (error) {
      console.log(error);
     
    }
  }

  useEffect(()=>{
    getAvailableSlot();

  },[docInfo])

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  // console.log(docId);

  return (
    <div className="px-[5%] py-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* start */}
        <div>
          <img
            src={docInfo?.image}
            alt=""
            className="bg-blue-500 w-full sm:max-w-72 rounded-lg"
          />
        </div>
        <div className="bg-white flex-1 border border-gray-400 px-4 md:px-10  py-7 mx-2 sm:mx-0 sm:mt-0 rounded-lg">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo?.name}
            <img src={assets.verified_icon} alt="" className="w-5" />
          </p>

          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo?.degree} -{docInfo?.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {" "}
              {docInfo?.experience}
            </button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-500 mt-3">
              About <img src={assets.info_icon} alt="" />{" "}
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-2 mb-2">
              {docInfo?.about}
            </p>
          </div>

          <p className=" font-medium ">
            Appointment fee:{" "}
            <span className="text-green-600 font-semibold sm:text-xl">
              {docInfo?.fees} <span>$</span>
            </span>
          </p>
        </div>

        {/* end */}
      </div>

      {/* booking slots */}

      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>
          Booking Slots
        </p>

        <div>
          {

          }
        </div>
      </div>

      {/* end of booking slots */}
    </div>
  );
}
