import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div className="my-7">
      <h2 className="font-bold text-lg">Places To Visit</h2>
      <div>
        {trip?.tripData?.itinerary.map((item, index) => (
          // Add key prop to this div
          <div key={index} className="mt-5"> 
            <h2 className="font-medium text-lg">Day {item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item.plan.map((place, placeIndex) => (
                // Add key prop to this div as well
                <div key={placeIndex} className="">
                  <h2 className="font-medium text-sm text-orange-600">
                    {place.time}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
