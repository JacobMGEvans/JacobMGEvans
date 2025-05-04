import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Exported type for user location
export interface UserLocation {
  id: string;
  lat: number;
  lng: number;
}

// Props for MapWindow: callback when hovering a user marker
interface MapWindowProps {
  onUserHover: (user: UserLocation | null) => void;
}

// Custom cyberpunk marker icon (placeholder asset)
const cyberIcon = L.icon({
  iconUrl: '/cyber-marker.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const MapWindow: React.FC<MapWindowProps> = ({ onUserHover }) => {
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
    <div className="map-window relative w-full md:w-2/3 h-full bg-black/50 backdrop-blur-sm border border-cyber-pink/60 rounded-lg overflow-hidden">
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
          <Marker
            key={user.id}
            position={[user.lat, user.lng]}
            icon={cyberIcon}
            eventHandlers={{
              mouseover: () => onUserHover(user),
              mouseout: () => onUserHover(null),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapWindow;
