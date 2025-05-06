import type React from 'react';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

export type UserLocation = {
  id: string;
  lat: number;
  lng: number;
  name?: string;
  status?: string;
  affiliation?: string;
  lastSeen?: string;
};

type MapWindowProps = {
  onUserHover: (user: UserLocation | null) => void;
  onLocationsChange?: (locations: UserLocation[]) => void;
};

const cyberIcon = Leaflet.icon({
  // TODO: temporary icon until we have a better one
  iconUrl: '/cyber-marker.svg',
  iconSize: [50, 50],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const CyberpunkMapStyle = () => {
  const map = useMap();

  useEffect(() => {
    const mapContainer = map.getContainer();
    mapContainer.style.filter =
      'hue-rotate(140deg) saturate(1.5) brightness(0.7) contrast(1.2)';

    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .leaflet-control-zoom {
        border: 1px solid #F6FF00 !important;
        background: rgba(0, 0, 0, 0.7) !important;
      }
      .leaflet-control-zoom a {
        color: #F6FF00 !important;
        background: rgba(0, 0, 0, 0.7) !important;
      }
      .leaflet-control-zoom a:hover {
        color: #00F0FF !important;
        background: rgba(0, 0, 0, 0.9) !important;
      }
      .leaflet-control-attribution {
        background: rgba(0, 0, 0, 0.7) !important;
        color: #F6FF00 !important;
        font-family: monospace !important;
        font-size: 8px !important;
      }
      .leaflet-control-attribution a {
        color: #00F0FF !important;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [map]);

  return null;
};

// Pulsing effect for markers - Also built into the Marker SVG
const PulsingMarker: React.FC<{
  position: [number, number];
  user: UserLocation;
  onHover: (user: UserLocation | null) => void;
}> = ({ position, user, onHover }) => {
  const markerRef = useRef<Leaflet.Marker>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const icon = marker.getElement();
    if (icon) {
      icon.classList.add('cyber-pulse');
    }

    return () => {
      if (icon) {
        icon.classList.remove('cyber-pulse');
      }
    };
  }, []);

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={cyberIcon}
      eventHandlers={{
        mouseover: () => onHover(user),
        mouseout: () => onHover(null),
        click: () => onHover(user),
      }}
    />
  );
};

// Generate random user locations around the world - used for simulation mode
// const generateRandomUsers = (count: number): UserLocation[] => {
//   const users: UserLocation[] = [];
//   const affiliations = ['CIVILIAN', 'CORPO', 'NOMAD', 'NETRUNNER', 'FIXER'];
//   const statuses = ['ACTIVE', 'IDLE', 'OFFLINE', 'UNKNOWN'];

//   for (let i = 0; i < count; i++) {
//     users.push({
//       id: `user-${i}`,
//       lat: Math.random() * 140 - 70, // -70 to 70
//       lng: Math.random() * 340 - 170, // -170 to 170
//       name: `User-${Math.floor(Math.random() * 1000)}`,
//       affiliation:
//         affiliations[Math.floor(Math.random() * affiliations.length)],
//       status: statuses[Math.floor(Math.random() * statuses.length)],
//       lastSeen: new Date(
//         Date.now() - Math.floor(Math.random() * 86400000)
//       ).toISOString(),
//     });
//   }

//   return users;
// };

const MapWindow: React.FC<MapWindowProps> = ({
  onUserHover,
  onLocationsChange,
}) => {
  const [locations, setLocations] = useState<UserLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a connection to the Presence Durable Object WebSocket
  // useEffect(() => {
  //   setIsLoading(true);
  //   const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  //   const ws = new WebSocket(
  //     `${protocol}://${window.location.host}/api/presence`
  //   );

  //   ws.onopen = () => {
  //     console.log('WebSocket connected to presence DO');
  //     // send one test/user event
  //     ws.send(
  //       JSON.stringify({
  //         id: crypto.randomUUID(),
  //         lat: 37.7749,
  //         lng: -122.4194,
  //         name: 'Local Test',
  //       })
  //     );
  //   };

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data) as UserLocation[];
  //     setLocations(data);
  //     if (isLoading) setIsLoading(false);
  //   };
  //   ws.onerror = (err) => console.error(err);
  //   ws.onclose = () => console.log('Socket closed');
  //   return () => ws.close();
  // }, []);

  // Connect to Presence Durable Object WebSocket for real-time presence data
  useEffect(() => {
    setIsLoading(true);
    //TODO: Should only be wss likely
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${protocol}://${window.location.host}/api/presence`;
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => console.log('WebSocket connected to presence DO');
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as UserLocation[];
        setLocations(data);
        onLocationsChange?.(data);
        if (isLoading) setIsLoading(false);
      } catch (err) {
        console.error('Error parsing presence data:', err);
      }
    };
    ws.onerror = (err) => console.error('WebSocket error:', err);
    ws.onclose = () => console.log('WebSocket closed');
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 text-cyber-yellow font-mono">
          <div className="w-16 h-16 border-2 border-t-cyber-yellow border-r-cyber-pink border-b-cyber-blue border-l-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-xs uppercase tracking-wider">
            Initializing Map
          </div>
          <div className="text-xs text-cyber-blue mt-2">
            Connecting to Durable Objects...
          </div>
        </div>
      )}

      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        zoomControl={true}
        style={{ height: '100%', width: '100%', background: '#111' }}
        className="z-0"
      >
        <CyberpunkMapStyle />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap | CP2077 Styled"
        />

        {locations.map((user) => (
          <PulsingMarker
            key={user.id}
            position={[user.lat, user.lng]}
            user={user}
            onHover={onUserHover}
          />
        ))}
      </MapContainer>

      {/* Map overlay elements */}
      <div className="absolute top-2 left-2 z-[400] text-cyber-yellow font-mono text-xs">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-cyber-yellow mr-1 animate-pulse"></div>
          <span>USERS: {locations.length}</span>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 z-[400] text-cyber-yellow font-mono text-xs">
        <div className="flex items-center">
          <span>GRID: </span>
          <span className="text-cyber-blue ml-1">ACTIVE</span>
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[401] pointer-events-none border border-cyber-yellow/20"></div>
      <div className="absolute inset-0 z-[401] pointer-events-none bg-[linear-gradient(0deg,rgba(246,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(246,255,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Scan effect */}
      <div className="absolute inset-0 z-[402] pointer-events-none overflow-hidden">
        <div className="w-full h-[1px] bg-cyber-yellow/30 animate-[mapScan_4s_ease-in-out_infinite]"></div>
      </div>

      <style>{`
        @keyframes mapScan {
          0%, 100% { transform: translateY(-10px); opacity: 0; }
          10%, 90% { opacity: 0.3; }
          50% { transform: translateY(100%); opacity: 0.3; }
        }
        
        :global(.cyber-pulse) {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MapWindow;
