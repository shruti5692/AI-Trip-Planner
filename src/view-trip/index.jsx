import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';


function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]); 

  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  // Used to get trip information from Firebase
  const getTripData = async () => {
    try {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document");
        toast("No Trip Found");
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast("Failed to load trip data.");
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Render components conditionally based on trip data */}
      {trip ? (
        <>
          {/* Information section */}
          <InfoSection trip={trip} />

          {/* Recommended Hotels */}
          <Hotels trip={trip} />

          {/* Daily Plan */}
          <PlacesToVisit trip={trip}/>

          {/* Footer */}
          <Footer trip={trip}/>
        </>
      ) : (
        <div>Loading...</div>  // Display loading state while trip data is being fetched
      )}
    </div>
  );
}

export default ViewTrip;
