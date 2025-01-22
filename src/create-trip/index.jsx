import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '/Users/ssrivas/Desktop/project/React App/ai-travel-planner/src/components/ui/input.jsx';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '/Users/ssrivas/Desktop/project/React App/ai-travel-planner/src/constants/options.jsx';
import { Button } from "../components/ui/button.jsx";
import { Toaster, toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading]=useState(false);
    const navigate=useNavigate();

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const login = useGoogleLogin({
        onSuccess: async (tokenInfo) => {
            console.log("Google Login Success:", tokenInfo);
            await GetUserProfile(tokenInfo);
        },
        onError: (error) => {
            console.error("Google Login Error:", error);
        },
        scope: "profile email",
    });

    const GetUserProfile = async (tokenInfo) => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenInfo.access_token}`,
                        Accept: 'application/json',
                    },
                }
            );
            console.log("User Profile:", response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            setOpenDialog(false);
            OnGenerateTrip();
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error("Failed to fetch user profile. Please try again.");
        }
    };

    const OnGenerateTrip = async () => {
        const user = localStorage.getItem('user');

        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.traveler) {
            toast("Please Fill All Details.");
            return;
        }
        setLoading(true);
        try {
            const FINAL_PROMPT = AI_PROMPT
                .replace("{location}", formData?.location?.label)
                .replace("{totalDays}", formData?.noOfDays)
                .replace("{traveler}", formData?.traveler)
                .replace("{budget}", formData?.budget);

            const result = await chatSession.sendMessage(FINAL_PROMPT);
            console.log("AI Response:", result?.response?.text());
            setLoading(false);
            SaveAiTrip(result?.response?.text());
            toast("Trip generated successfully!");
        } catch (error) {
            console.error("Error generating trip:", error);
            toast.error("Failed to generate trip. Please try again.");
        }
    };

    const SaveAiTrip = async (TripData) => {

        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docID = Date.now().toString();
        await setDoc(doc(db, "AiTrips", docID), {
            UserChoice: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docID
        });
        setLoading(false);
        navigate('/view-trip/'+docID)
    };


    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
            <p className="mt-3 text-gray-500 text-xl">
                Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>

            {/* Destination Input */}
            <div className="mt-20 flex flex-col gap-8">
                <div>
                    <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            value: place,
                            onChange: (v) => {
                                setPlace(v);
                                handleInputChange('location', v);
                            },
                        }}
                    />
                </div>

                {/* Trip Days Input */}
                <div>
                    <h2 className="text-xl my-3 font-medium">How many days are you planning for your trip?</h2>
                    <Input
                        placeholder="Ex. 3"
                        type="number"
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    />
                </div>
            </div>

            {/* Budget Options */}
            <div>
                <h2 className="mt-10 text-xl my-3 font-medium">What is Your Budget?</h2>
                <div className="grid grid-cols-3 gap-5 mt-5">
                    {SelectBudgetOptions.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange('budget', item.title)}
                            className={`p-4 border cursor-pointer 
                          rounded-lg hover:shadow-lg 
                          ${formData?.budget === item.title ? 'shadow-lg border-black' : ''}`}>
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="font-bold text-lg">{item.title}</h2>
                            <h2 className="text-sm text-gray-500">{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            {/* Travelers Options */}
            <div>
                <h2 className="mt-10 text-xl my-3 font-medium">Who do you plan to travel with on your next adventure?</h2>
                <div className="grid grid-cols-3 gap-5 mt-5">
                    {SelectTravelersList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange('traveler', item.people)}
                            className={`p-4 border cursor-pointer
                         rounded-lg hover:shadow-lg
                         ${formData?.traveler === item.people ? 'shadow-lg border-black' : ''}`}>
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="font-bold text-lg">{item.title}</h2>
                            <h2 className="text-sm text-gray-500">{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-10 justify-end flex">
                <Button 
                disabled={loading}
                onClick={OnGenerateTrip} className="bg-black text-white">
                {loading?
                <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>: 'Generate Trip'
                }
                </Button>
            </div>

            <Toaster />

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-white text-black">
                    <DialogHeader>
                        <button
                            className="absolute top-2 right-2 text-xl"
                            onClick={() => setOpenDialog(false)}
                        >
                            ✕
                        </button>
                        <DialogDescription>
                            <img src="/logo.svg" alt="Logo" />
                            <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
                            <p>Sign in to the App with Google Authentication securely</p>

                            <Button
                                disabled={loading}
                                onClick={login}
                                className="w-full mt-5 bg-black text-white flex gap-4 items-center">
                                <FcGoogle />
                                Sign In With Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateTrip;
