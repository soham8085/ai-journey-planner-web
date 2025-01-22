import React, { useEffect, useState } from 'react';
import { Button } from "../../components/ui/button.jsx";
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  const GetplacePhoto = async () => {
    try {
      if (!trip?.UserChoice?.location?.label) {
        console.error("Error: Location label is missing.");
        return;
      }

      const data = {
        textQuery: trip.UserChoice.location.label,
      };

      const result = await GetPlaceDetails(data);
      const photos = result?.places?.[0]?.photos;

      if (photos && photos[3]?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photos[3].name);
        setPhotoUrl(PhotoUrl);
      } else {
        console.warn("No photo found for the given location.");
        setPhotoUrl('/placeholder.jpg'); // Fallback image
      }
    } catch (error) {
      console.error("Error fetching place details:", error.response?.data || error.message);
      setPhotoUrl('/placeholder.jpg'); // Fallback image
    }
  };

  useEffect(() => {
    if (trip) {
      GetplacePhoto();
    }
  }, [trip]);

  return (
    <div>
      <img
        src={photoUrl || '/placeholder.jpg'}
        className="h-[340px] w-full object-cover rounded-xl"
        alt="Location"
      />

      <div className="my-4 flex flex-col gap-1">
        <h2 className="font-bold text-2xl">{trip?.UserChoice?.location?.label}</h2>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            📅 {trip?.UserChoice?.noOfDays || "N/A"} Day
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            💰 {trip?.UserChoice?.budget || "N/A"} Budget
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            🥂 Number of Travellers: {trip?.UserChoice?.traveler || "N/A"}
          </h2>
        </div>
        <Button className="bg-black text-white rounded-xl">
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
