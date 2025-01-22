//dynamic route
//rfce
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {
    const { tripID } = useParams();
    const [trip,setTrip]=useState([]);

    useEffect(() => {
        console.log('Received Trip ID:', tripID); // Log tripID
        tripID && GetTripData();
    }, [tripID]);

    const GetTripData = async () => {
        const docRef = doc(db, 'AiTrips', tripID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Document:', docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log('No such document!');
            toast('No Trip Found');
        }
    }


    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information Section */}
                <InfoSection trip={trip} />
            {/* Recommended Hotels */}
                <Hotels trip={trip}/>
            {/* Daily Plan */}
                <PlacesToVisit trip={trip} />
            {/* Footer */}
                <Footer />
        </div>
    );
}

export default Viewtrip;
