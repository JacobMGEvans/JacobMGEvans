import React, { useEffect, useState } from 'react';

// Type for user location details
interface LocationDetails {
  id: string;
  lat: number;
  lng: number;
  timestamp: string;
}

const DetailsPanel: React.FC = () => {
  const [details, setDetails] = useState<LocationDetails | null>(null);

  useEffect(() => {
    // TODO: Replace with Durable Object WebSocket for real-time user details
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDetails({
            id: 'you',
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: new Date().toLocaleTimeString(),
          });
        },
        (error) => {
          console.warn('Geolocation error', error);
        }
      );
    }
  }, []);

  return (
    <div className="details-panel relative w-full md:w-1/3 h-full bg-gray-900 border border-cyber-blue/50 rounded-lg overflow-auto p-4">
      <h3 className="text-cyber-pink text-xl mb-2 font-heading">
        Your Location
      </h3>
      {details ? (
        <ul className="text-gray-200 font-mono space-y-1">
          <li>ID: {details.id}</li>
          <li>Latitude: {details.lat.toFixed(4)}</li>
          <li>Longitude: {details.lng.toFixed(4)}</li>
          <li>Last Active: {details.timestamp}</li>
        </ul>
      ) : (
        <p className="text-gray-400">Fetching your location...</p>
      )}
    </div>
  );
};

export default DetailsPanel;
