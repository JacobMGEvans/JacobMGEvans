import type React from 'react';
import { useEffect, useState, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export type UserLocation = {
  id: string;
  lat: number;
  lng: number;
  name?: string;
  status?: string;
  affiliation?: string;
  lastSeen?: string;
  ping?: number;
  networkType?: string;
};

type MapWindowProps = {
  onUserHover: (user: UserLocation | null) => void;
  onLocationsChange?: (locations: UserLocation[]) => void;
};

const generateRandomLocations = (count: number): UserLocation[] => {
  const users: UserLocation[] = [];
  const affiliations = ['CIVILIAN', 'CORPO', 'NOMAD', 'NETRUNNER', 'FIXER'];
  const statuses = ['ACTIVE', 'IDLE', 'OFFLINE', 'UNKNOWN'];

  const landmasses = [
    { name: 'North America', latRange: [24, 70], lngRange: [-168, -52] },
    { name: 'South America', latRange: [-56, 13], lngRange: [-81, -34] },
    { name: 'Europe', latRange: [34, 71], lngRange: [-25, 60] },
    { name: 'Africa', latRange: [-35, 38], lngRange: [-18, 52] },
    { name: 'Asia', latRange: [0, 75], lngRange: [60, 180] },
    { name: 'East Asia Islands', latRange: [20, 50], lngRange: [120, 150] },
    { name: 'Indonesia/SEA Islands', latRange: [-11, 20], lngRange: [94, 141] },
    {
      name: 'Oceania (Australia/NZ)',
      latRange: [-47, -10],
      lngRange: [112, 178],
    },
  ];

  for (let i = 0; i < count; i++) {
    const landmass = landmasses[Math.floor(Math.random() * landmasses.length)];
    const lat =
      Math.random() * (landmass.latRange[1] - landmass.latRange[0]) +
      landmass.latRange[0];
    const lng =
      Math.random() * (landmass.lngRange[1] - landmass.lngRange[0]) +
      landmass.lngRange[0];

    users.push({
      id: `user-${i}`,
      lat: lat,
      lng: lng,
      name: `User-${Math.floor(Math.random() * 1000)}`,
      affiliation:
        affiliations[Math.floor(Math.random() * affiliations.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastSeen: new Date(
        Date.now() - Math.floor(Math.random() * 86400000)
      ).toISOString(),
    });
  }

  return users;
};

const MapWindow: React.FC<MapWindowProps> = ({
  onUserHover,
  onLocationsChange,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [locations, setLocations] = useState<UserLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mockCount, setMockCount] = useState<number>(10);
  const stylesAdded = useRef<boolean>(false);
  const mapLoaded = useRef<boolean>(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap | CP2077 Styled',
            },
          },
          layers: [
            {
              id: 'osm-tiles',
              type: 'raster',
              source: 'osm-tiles',
            },
          ],
        },
        center: [0, 20],
        zoom: 2,
      });

      map.current.on('load', () => {
        mapLoaded.current = true;

        if (!stylesAdded.current) {
          stylesAdded.current = true;

          const canvas = map.current?.getCanvas();
          if (canvas) {
            canvas.style.filter =
              'hue-rotate(140deg) saturate(1.5) brightness(0.7) contrast(1.2)';
          }

          const styleElement = document.createElement('style');
          styleElement.id = 'maplibre-cyber-styles';
          styleElement.textContent = `
            .maplibregl-ctrl-group {
              border: 1px solid #F6FF00 !important;
              background: rgba(0, 0, 0, 0.7) !important;
              border-radius: 0 !important;
            }
            .maplibregl-ctrl button {
              color: #F6FF00 !important;
              background: rgba(0, 0, 0, 0.7) !important;
              border: none !important;
            }
            .maplibregl-ctrl button:hover {
              color: #00F0FF !important;
              background: rgba(0, 0, 0, 0.9) !important;
            }
            .maplibregl-ctrl-attrib {
              background: rgba(0, 0, 0, 0.7) !important;
              color: #F6FF00 !important;
              font-family: monospace !important;
              font-size: 8px !important;
            }
            .maplibregl-ctrl-attrib a {
              color: #00F0FF !important;
            }
          `;
          document.head.appendChild(styleElement);
        }
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setIsLoading(false);
    }

    return () => {
      if (map.current) {
        if (map.current.getSource('user-locations')) {
          if (map.current.getLayer('user-locations-pulse')) {
            map.current.removeLayer('user-locations-pulse');
          }
          if (map.current.getLayer('user-locations-circles')) {
            map.current.removeLayer('user-locations-circles');
          }
          map.current.removeSource('user-locations');
        }

        map.current.remove();
        map.current = null;
      }
      mapLoaded.current = false;
      const existingStyles = document.getElementById('maplibre-cyber-styles');
      if (existingStyles) {
        existingStyles.remove();
      }
      stylesAdded.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const mockLocations = generateRandomLocations(mockCount);
    const validMockLocations = mockLocations.filter((location) => {
      const isValid =
        typeof location.lat === 'number' &&
        typeof location.lng === 'number' &&
        !isNaN(location.lat) &&
        !isNaN(location.lng) &&
        Math.abs(location.lat) <= 90 &&
        Math.abs(location.lng) <= 180;

      if (!isValid) {
        console.error('Invalid mock location generated:', location);
      }
      return isValid;
    });

    setLocations(validMockLocations);
    onLocationsChange?.(validMockLocations);

    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${protocol}://${window.location.host}/api/presence`;

    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connected to presence DO');

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const localUser: UserLocation = {
                id: 'local-user',
                lat: latitude,
                lng: longitude,
                name: 'Local User',
                status: 'ACTIVE',
                affiliation: 'SELF',
                lastSeen: new Date().toISOString(),
              };
              ws.send(JSON.stringify(localUser));
            },
            (error) => console.error('Geolocation error:', error)
          );
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as UserLocation[];
          const validWSData = data.filter((location) => {
            const isValid =
              typeof location.lat === 'number' &&
              typeof location.lng === 'number' &&
              !isNaN(location.lat) &&
              !isNaN(location.lng) &&
              Math.abs(location.lat) <= 90 &&
              Math.abs(location.lng) <= 180;

            if (!isValid) {
              console.error('Invalid WebSocket location received:', location);
            }
            return isValid;
          });

          const combinedData =
            validWSData.length > 0
              ? [...validWSData, ...validMockLocations]
              : validMockLocations;

          setLocations(combinedData);
          onLocationsChange?.(combinedData);
          setIsLoading(false);
        } catch (err) {
          console.error('Error parsing presence data:', err);
          setLocations(validMockLocations);
          onLocationsChange?.(validMockLocations);
          setIsLoading(false);
        }
      };

      ws.onerror = (error) => {
        console.warn('WebSocket error:', error, 'using mock data only');
        setLocations(validMockLocations);
        onLocationsChange?.(validMockLocations);
        setIsLoading(false);
      };

      ws.onclose = () => {
        console.log('WebSocket closed, ensuring mock data is set');
        setLocations(validMockLocations);
        onLocationsChange?.(validMockLocations);
        setIsLoading(false);
      };

      setTimeout(() => {
        if (isLoading) {
          console.log('WebSocket timeout, showing mock data');
          setLocations(validMockLocations);
          onLocationsChange?.(validMockLocations);
          setIsLoading(false);
        }
      }, 2000);

      return () => {
        ws.close();
      };
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      setLocations(validMockLocations);
      onLocationsChange?.(validMockLocations);
      setIsLoading(false);
    }
  }, [mockCount, onLocationsChange]);

  const addGeoJSONMarkers = (locations: UserLocation[]) => {
    if (!map.current || !mapLoaded.current) return;

    const geojson = {
      type: 'FeatureCollection' as const,
      features: locations.map((location, index) => ({
        type: 'Feature' as const,
        properties: {
          id: location.id,
          name: location.name || location.id,
          status: location.status || 'UNKNOWN',
          affiliation: location.affiliation || 'CIVILIAN',
          index: index,
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [location.lng, location.lat],
        },
      })),
    };

    if (map.current.getSource('user-locations')) {
      if (map.current.getLayer('user-locations-pulse')) {
        map.current.removeLayer('user-locations-pulse');
      }
      if (map.current.getLayer('user-locations-circles')) {
        map.current.removeLayer('user-locations-circles');
      }
      map.current.removeSource('user-locations');
    }

    map.current.addSource('user-locations', {
      type: 'geojson',
      data: geojson,
    });

    map.current.addLayer({
      id: 'user-locations-circles',
      type: 'circle',
      source: 'user-locations',
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          2,
          4,
          10,
          12,
          15,
          20,
        ],
        'circle-color': '#F6FF00',
        'circle-stroke-color': '#00F0FF',
        'circle-stroke-width': [
          'interpolate',
          ['linear'],
          ['zoom'],
          2,
          1,
          10,
          2,
          15,
          3,
        ],
        'circle-opacity': 0.9,
        'circle-stroke-opacity': 1,
      },
    });

    map.current.addLayer({
      id: 'user-locations-pulse',
      type: 'circle',
      source: 'user-locations',
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          2,
          6,
          10,
          18,
          15,
          30,
        ],
        'circle-color': 'transparent',
        'circle-stroke-color': '#F6FF00',
        'circle-stroke-width': 1,
        'circle-stroke-opacity': [
          'interpolate',
          ['linear'],
          ['*', ['get', 'index'], 0.5],
          0,
          0.3,
          5,
          0.1,
          10,
          0.3,
        ],
        'circle-opacity': 0,
      },
    });

    const layers = ['user-locations-circles', 'user-locations-pulse'];

    layers.forEach((layerId) => {
      map.current!.on('click', layerId, (e) => {
        if (e.features && e.features[0]) {
          const properties = e.features[0].properties;
          const location = locations.find((loc) => loc.id === properties.id);
          if (location) {
            onUserHover(location);
          }
        }
      });

      map.current!.on('mouseenter', layerId, (e) => {
        if (e.features && e.features[0]) {
          const properties = e.features[0].properties;
          const location = locations.find((loc) => loc.id === properties.id);
          if (location) {
            onUserHover(location);
          }
        }
        map.current!.getCanvas().style.cursor = 'pointer';
      });

      map.current!.on('mouseleave', layerId, () => {
        onUserHover(null);
        map.current!.getCanvas().style.cursor = '';
      });
    });
  };

  // !Update markers when locations change - WAIT FOR MAP TO LOAD
  useEffect(() => {
    if (!map.current || !locations.length || !mapLoaded.current) {
      return;
    }

    //! Use GeoJSON approach for markers
    addGeoJSONMarkers(locations);
  }, [locations, onUserHover, mapLoaded]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-2 right-2 z-[400] bg-black/20 p-1 text-cyber-yellow font-mono text-[10px] rounded opacity-60 hover:opacity-100 transition-opacity">
        <label className="flex items-center">
          Mock:
          <input
            type="number"
            min={1}
            max={50}
            value={mockCount}
            onChange={(e) => setMockCount(Number(e.target.value))}
            className="ml-1 w-8 bg-black/50 text-cyber-yellow border border-cyber-yellow/50 rounded text-[10px] px-1"
          />
        </label>
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 text-cyber-yellow font-mono">
          <div className="w-16 h-16 border-2 border-t-cyber-yellow border-r-cyber-pink border-b-cyber-blue border-l-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-xs uppercase tracking-wider">
            Initializing Map
          </div>
          <div className="text-xs text-cyber-blue mt-2">
            Loading presence network...
          </div>
        </div>
      )}

      {/* Map container */}
      <div ref={mapContainer} className="w-full h-full" />

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
      `}</style>
    </div>
  );
};

export default MapWindow;
