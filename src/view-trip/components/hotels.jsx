import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-9 my-2">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 rounded-xl">
        {trip?.tripData?.travelPlan?.hotelOptions?.map((hotel, index) => (
          // Add key here
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
