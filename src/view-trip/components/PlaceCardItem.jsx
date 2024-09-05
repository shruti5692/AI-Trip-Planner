import React from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
      <div className='border rounded-xl p-3 mt-3 flex gap-5 hover:scale-105 hover:shadow-md transition-all cursor-pointer'>
          <img src='/placeholder.jpg' 
          className='w-[130px] h-[100px] rounded-xl'
          />
          <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-400'>{place.placeDetails}</p>
            <h2 className='mt-2'>🕙{place.timeToTravel}</h2>
          </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem