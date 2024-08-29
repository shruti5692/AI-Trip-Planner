import React, { useState } from 'react';
import axios from 'axios';

function CreateTrip() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {  // Start fetching suggestions when the query length is more than 2
      try {
        const response = await axios.get(`https://us1.locationiq.com/v1/autocomplete.php`, {
          params: {
            key: 'pk.8afa5a53c2165706b6e09e7de9d0b0c3',  // Replace with your LocationIQ API key
            q: query,
            limit: 5,  // You can set the number of suggestions here
            format: 'json'
          }
        });

        setSuggestions(response.data);  // Update suggestions state with the API response
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);  // Clear suggestions if query length is less than 3
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.display_name);
    setSuggestions([]);  // Clear suggestions after selection
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20'>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-start'>
          <h2 className='text-xl font-medium  my-3'>What is your destination of choice?</h2>
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Enter destination"
            className="border px-4 py-2 rounded w-[50%]"
          />

          {/* Render suggestions dropdown */}
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
      </div>
    </div>
  );
}

export default CreateTrip;
