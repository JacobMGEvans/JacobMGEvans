import React from 'react';
import { UserLocation } from './MapWindow';

// Props accepted by DetailsPanel when a user ping is hovered
interface DetailsPanelProps {
  user: UserLocation | null;
}

// Panel styled like Cyberpunk2077 scan detail window
const DetailsPanel: React.FC<DetailsPanelProps> = ({ user }) => {
  return (
    <div className="details-panel relative w-full md:w-1/3 h-full bg-black/50 backdrop-blur-sm border border-cyber-pink/60 rounded-lg overflow-auto p-4 text-gray-200 font-mono">
      {/* Placeholder for scan-frame digital asset */}
      <div className="scan-frame bg-[url('/hud-scan-placeholder.png')] bg-center bg-no-repeat bg-contain h-32 mb-4">
        {/* TODO: Replace '/hud-scan-placeholder.png' with actual scan overlay asset */}
      </div>
      {user ? (
        <div>
          <h3 className="text-cyber-pink text-2xl mb-2 font-heading">
            Scan Data
          </h3>
          <ul className="space-y-1">
            <li>
              <span className="text-mountain-blue">ID:</span> {user.id}
            </li>
            <li>
              <span className="text-mountain-blue">Latitude:</span>{' '}
              {user.lat.toFixed(4)}
            </li>
            <li>
              <span className="text-mountain-blue">Longitude:</span>{' '}
              {user.lng.toFixed(4)}
            </li>
            <li>
              <span className="text-mountain-blue">Ping Time:</span>{' '}
              {new Date().toLocaleTimeString()}
            </li>
          </ul>
          {/* Placeholder for animated scan bars */}
          <div className="scan-bars mt-4 h-2 bg-cyber-pink/30 overflow-hidden relative">
            {/* TODO: Add animated vertical scan bars asset */}
          </div>
        </div>
      ) : (
        <p className="text-gray-400">
          Hover over a ping on the map to scan user data...
        </p>
      )}
    </div>
  );
};

export default DetailsPanel;
