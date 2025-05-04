import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Type for user location
interface UserLocation {
  id: string;
  lat: number;
  lng: number;
}

const MapWindow: React.FC = () => {
  const [locations, setLocations] = useState<UserLocation[]>([]);

  useEffect(() => {
    // TODO: Replace with Durable Object WebSocket for real-time presence updates
    const wsUrl =
      window.location.origin.replace(/^http/, 'ws') + '/api/presence';
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as UserLocation[];
        setLocations(data);
      } catch (err) {
        console.warn('Invalid presence data', err);
      }
    };
    ws.onerror = () => {
      console.warn('WebSocket connection error');
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="map-window relative w-full md:w-2/3 h-full bg-gray-900 border border-cyber-blue/50 rounded-lg overflow-hidden">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {locations.map((user) => (
          <Marker key={user.id} position={[user.lat, user.lng]}>
            <Popup>
              <span className="text-white font-mono">User: {user.id}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapWindow;
