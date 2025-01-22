import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react';

function PlaceCardItem({ place }) {

    const [photoUrl, setPhotoUrl] = useState(null);

  const GetplacePhoto = async () => {
    try {
      if (!place?.placeName) {
        console.error("Error: Location label is missing.");
        return;
      }

      const data = {
        textQuery: place?.placeName,
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
    if (place) {
      GetplacePhoto();
    }
  }, [place]);

  return (
    <a 
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all 
        hover:shadow-md cursor-pointer object-cover">
        <img 
          src={photoUrl} 
          alt={place?.placeName || "Place"} 
          className="w-[130px] h-[130px] rounded-xl" 
        />
        <div>
          <h2 className="font-bold text-sm">{place?.placeName}</h2>
          <p className="text-gray-500">{place?.Place_Details}</p>
          <h2 className="font-medium text-sm text-orange-500 my-2">{place?.ticket_pricing}</h2>
        </div>
      </div>
    </a>
  );
}

export default PlaceCardItem;
