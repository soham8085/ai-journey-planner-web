import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
    return (
        <div>
            <h2 className="font-bold text-xl mt-9 my-2">Places To Visit</h2>

            <div>
                {trip?.tripData?.travelPlan?.itinerary &&
                    Object.entries(trip.tripData.travelPlan.itinerary)
                        .sort() // Sort days in ascending order (e.g., day1, day2, etc.)
                        .map(([day, details]) => (
                            <div key={day} className='my-10'>
                                {/* Capitalize the first letter of 'day' */}
                                <h3 className="font-semibold mt-4 my-1">{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                                {details?.plan?.map((place, index) => (
                                    <div key={index}>
                                        <PlaceCardItem place={place} />
                                    </div>
                                ))}
                            </div>
                        ))}
            </div>
        </div>
    );
}

export default PlacesToVisit;
