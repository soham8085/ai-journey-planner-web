import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';

function HotelCardItem({ hotel }) {

    const [photoUrl, setPhotoUrl] = useState(null);

  const GetplacePhoto = async () => {
    try {
      if (!hotel?.HotelName) {
        console.error("Error: Location label is missing.");
        return;
      }

      const data = {
        textQuery: hotel?.HotelName,
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
    if (hotel) {
      GetplacePhoto();
    }
  }, [hotel]);


  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.HotelName)},${encodeURIComponent(hotel?.Hotel_address)}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img src={photoUrl} className="rounded-xl h-[180px] w-[250px] object-cover" alt="Hotel" />
        <div className="my-2">
          <h2 className="font-medium underline mt-2">{hotel?.HotelName}</h2>
          <h2 className="text-xs text-gray-500 mt-2">📍 {hotel?.Hotel_address}</h2>
          <h2 className="text-sm text-gray-600 mt-2">{hotel?.price}</h2>
          <h2 className="text-sm text-gray-600">⭐ {hotel?.rating} rating</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
