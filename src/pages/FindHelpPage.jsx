import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// ✅ Supabase setup
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ✅ Google Map container style
const containerStyle = {
  width: '100%',
  height: '500px',
};

const FindHelpPage = () => {
  const { isSignedIn } = useUser();
  const [location, setLocation] = useState(null);
  const [mechanics, setMechanics] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // ✅ Get current location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // ✅ Fetch & calculate distance
  const getNearbyMechanics = async () => {
    if (!location) {
      alert('Please share your location first!');
      return;
    }

    const { data, error } = await supabase.from('mechanics').select('*');
    if (error) {
      console.error(error);
      return;
    }

    const withDistance = data.map((m) => {
      const dist = getDistanceFromLatLonInKm(
        location.lat,
        location.lng,
        m.lat,
        m.lng
      );
      return { ...m, distance: dist };
    });

    withDistance.sort((a, b) => a.distance - b.distance);
    setMechanics(withDistance);
  };

  // ✅ Haversine distance
const deg2rad = (deg) => (deg * Math.PI) / 180;

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  // 🔑 Ensure numbers
  lat1 = parseFloat(lat1);
  lon1 = parseFloat(lon1);
  lat2 = parseFloat(lat2);
  lon2 = parseFloat(lon2);

  if (
    isNaN(lat1) || isNaN(lon1) ||
    isNaN(lat2) || isNaN(lon2)
  ) {
    console.warn('Invalid lat/lon:', lat1, lon1, lat2, lon2);
    return NaN;
  }

  const R = 6371; // km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};


  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-6xl mx-auto">
      {/* Left Side: Actions + List */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Find Nearby Mechanics</h1>

        <button
          onClick={handleGetLocation}
          className="w-full bg-blue-600 text-black py-2 px-4 rounded mb-3 text-sm hover:bg-blue-700 transition"
        >
          📍 Share My Location
        </button>

        <button
          onClick={getNearbyMechanics}
          className="w-full bg-green-600 text-black py-2 px-4 rounded mb-6 text-sm hover:bg-green-700 transition"
        >
          🔍 Show Mechanics Nearby
        </button>

        {mechanics.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Nearby Mechanics</h2>
            {mechanics.map((m) => (
              <div
                key={m.id}
                className="p-3 border rounded flex justify-between items-center shadow-sm bg-white"
              >
                <span className="font-medium">{m.name}</span>
                <span className="text-xs text-gray-500">
                  {m.distance.toFixed(2)} km away
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Map */}
      <div className="flex-1">
        {isLoaded && location && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={13}
          >
            <Marker position={location} label="You" />
            {mechanics.map((m) => (
              <Marker
                key={m.id}
                position={{ lat: m.latitude, lng: m.longitude }}
                label={m.name}
              />
            ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default FindHelpPage;
