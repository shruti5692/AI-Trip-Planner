// import React, { useState } from "react";
// import axios from "axios";
// import { Input } from "../components/ui/Input";
// import { SelectBudgetOptions, SelectTravelsList } from "@/constants/Options";
// import { Button } from '../components/ui/Button';

// function CreateTrip() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [formData, setFormData] = useState({
//     destination: "",
//     noOfDays: "",
//     budget: "",
//     travelCompanions: ""
//   });

//   const handleInputChange = async (field, value) => {
//     // Update form data
//     setFormData(prevState => ({
//       ...prevState,
//       [field]: value
//     }));
//     console.log("Form Data:", { ...formData, [field]: value });
//   };

//   const handleDestinationChange = async (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     if (query.length > 2) {
//       try {
//         const response = await axios.get(
//           `https://us1.locationiq.com/v1/autocomplete.php`,
//           {
//             params: {
//               key: "pk.8afa5a53c2165706b6e09e7de9d0b0c3", // Replace with your LocationIQ API key
//               q: query,
//               limit: 5,
//               format: "json",
//             },
//           }
//         );
//         setSuggestions(response.data);
//       } catch (error) {
//         console.error("Error fetching suggestions:", error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSearchQuery(suggestion.display_name);
//     setSuggestions([]);

//     // Save and log the selected location and its ID
//     const selectedPlace = {
//       id: suggestion.place_id,
//       name: suggestion.display_name,
//     };

//     // Update form data with the selected destination
//     handleInputChange("destination", suggestion.display_name);
  
//   };


//   const OnGenerateTrip=()=>{
//     if(formData?.noOfDays>5){
//       return;
//     }
//     console.log(formData)
//   }
//   return (
//     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
//       <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
//       <p className="mt-3 text-gray-500 text-xl">
//         Just provide some basic information, and our trip planner will generate
//         a customized itinerary based on your preferences.
//       </p>

//       <div className="mt-20 flex flex-col gap-9">
//         <div>
//           <h2 className="text-xl font-medium my-3">What is your destination of choice?</h2>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleDestinationChange}
//             placeholder="Enter destination"
//             className="border px-4 py-2 rounded w-[100%]"
//           />

//           {suggestions.length > 0 && (
//             <ul className="border mt-2 rounded bg-white shadow-lg">
//               {suggestions.map((suggestion) => (
//                 <li
//                   key={suggestion.place_id}
//                   className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//                   onClick={() => handleSuggestionClick(suggestion)}
//                 >
//                   {suggestion.display_name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div>
//           <h2 className="text-xl font-medium my-3">How many days are you planning your trip?</h2>
//           <Input
//             placeholder={"Ex. 3"}
//             type="number"
//             onChange={(e) => handleInputChange('noOfDays', e.target.value)}
//           />
//         </div>

//         <div>
//           <h2 className="text-xl font-medium my-3">What is Your Budget?</h2>
//           <div className="grid grid-cols-3 gap-5 mt-5">
//             {SelectBudgetOptions.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleInputChange('budget', item.title)}
//                 className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
//                   ${formData?.budget==item.title&&'shadow-lg border-black' }`
//                 }
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg">{item.title}</h2>
//                 <h2 className="text-sm text-gray-500">{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h2 className="text-xl font-medium my-3">
//             Who do you plan on traveling with on your next adventure?
//           </h2>
//           <div className="grid grid-cols-3 gap-5 mt-5">
//             {SelectTravelsList.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleInputChange('travelCompanions', item.people)}
//                 className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
//                   ${formData?.travelCompanions==item.people&&'shadow-lg border-black'}
//                   `}
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg">{item.title}</h2>
//                 <h2 className="text-sm text-gray-500">{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="my-10 justify-end flex">
//         <Button onClick={OnGenerateTrip}>Generate Trip</Button>
//       </div>
//     </div>
//   );
// }

// export default CreateTrip;

import React, { useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/Input";
import { SelectBudgetOptions, SelectTravelsList } from "@/constants/Options";
import { Button } from '../components/ui/Button';
import { toast } from "sonner";

function CreateTrip() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    destination: "",
    noOfDays: "",
    budget: "",
    travelCompanions: ""
  });
  const [error, setError] = useState("");

  const handleInputChange = async (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
    setError(""); // Clear error message when user interacts
    console.log("Form Data:", { ...formData, [field]: value });
  };

  const handleDestinationChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(
          `https://us1.locationiq.com/v1/autocomplete.php`,
          {
            params: {
              key: "pk.8afa5a53c2165706b6e09e7de9d0b0c3",
              q: query,
              limit: 5,
              format: "json",
            },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.display_name);
    setSuggestions([]);
    handleInputChange("destination", suggestion.display_name);
  };

  const validateForm = () => {
    if (!formData.destination || !formData.noOfDays || !formData.budget || !formData.travelCompanions) {
      toast("Please fill in all fields to generate your trip.");
      return false;
    }
    return true;
  };

  const onGenerateTrip = () => {
    if (!validateForm()) return;

    if (formData.noOfDays < 1 || formData.noOfDays > 5) {
      setError("Number of days should be between 1 and 5.");
      return;
    }

    console.log(formData);
    // Process the trip generation here
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl font-medium my-3">What is your destination of choice?</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={handleDestinationChange}
            placeholder="Enter destination"
            className="border px-4 py-2 rounded w-[100%]"
            required
          />
          {suggestions.length > 0 && (
            <ul className="border mt-2 rounded bg-white shadow-lg">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xl font-medium my-3">How many days are you planning your trip?</h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            min={1}
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            required
          />
        </div>

        <div>
          <h2 className="text-xl font-medium my-3">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData?.budget === item.title && 'shadow-lg border-black'}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium my-3">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('travelCompanions', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData?.travelCompanions === item.people && 'shadow-lg border-black'}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mt-5">
          {error}
        </div>
      )}

      <div className="my-10 justify-end flex">
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;


