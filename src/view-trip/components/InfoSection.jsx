import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect } from "react";
import { IoMdShare } from "react-icons/io";

function InfoSection({ trip }) {
  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.destination,
    };
    
    try {
      const result = await GetPlaceDetails(data);
      console.log(result.data.places[0].photos[3].name);
    } catch (error) {
      console.error("Error fetching place details:", error.message);
    }
  };

  return (
    <div>
      <img
        src="/placeholder.jpg"
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.destination}
          </h2>

          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md">
              📅{trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md">
              💰{trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md">
              🥂No. Of Traveler: {trip?.userSelection?.travelCompanions}
            </h2>
          </div>
        </div>
        <Button>
          <IoMdShare />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
