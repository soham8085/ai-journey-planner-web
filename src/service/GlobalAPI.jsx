import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    'X-Goog-FieldMask': 'places.photos,places.displayName,places.id', // Should be a comma-separated string
  },
};

export const GetPlaceDetails = async (data) => {
  try {
    // Ensure 'data' has the correct structure
    const response = await axios.post(BASE_URL, data, config);
    return response.data; // Handle the response
  } catch (error) {
    console.error("Error fetching place details:", error.response?.data || error.message);
    throw error; // Re-throw error for further handling
  }
};

export const PHOTO_REF_URL ='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
