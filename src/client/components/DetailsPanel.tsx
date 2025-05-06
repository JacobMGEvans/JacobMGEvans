import type React from 'react';
import { useState, useEffect } from 'react';
import type { UserLocation } from './MapWindow';
interface DetailsPanelProps {
  user: UserLocation | null;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ user }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    if (user) {
      setIsScanning(true);
      setScanProgress(0);
      setScanComplete(false);

      const interval = setInterval(() => {
        setScanProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setScanComplete(true);
            return 100;
          }
          return newProgress;
        });
      }, 50);

      return () => clearInterval(interval);
    } else {
      setIsScanning(false);
      setScanProgress(0);
      setScanComplete(false);
    }
  }, [user]);

  const generateRandomDetails = () => {
    const backgrounds = [
      "Grew up in Night City's industrial zone",
      'Former Arasaka employee, went rogue',
      'Nomad from the Aldecaldo clan',
      'Street kid from Heywood',
      'Corpo rat, specialized in data mining',
    ];

    const skills = [
      'Netrunning: Advanced',
      'Combat: Moderate',
      'Tech: Expert',
      'Stealth: Basic',
      'Hacking: Proficient',
    ];

    const affiliations = [
      'Maelstrom gang associate',
      'Mox sympathizer',
      'Militech contractor',
      'Independent fixer',
      'Trauma Team subscriber',
    ];

    return {
      background: backgrounds[Math.floor(Math.random() * backgrounds.length)],
      skills: [
        skills[Math.floor(Math.random() * skills.length)],
        skills[Math.floor(Math.random() * skills.length)],
      ],
      affiliation:
        affiliations[Math.floor(Math.random() * affiliations.length)],
    };
  };

  const userDetails = user ? generateRandomDetails() : null;

  return (
    <div className="h-full overflow-auto text-gray-200 font-mono p-6">
      {/* Scan frame with digital asset placeholder */}
      <div className="relative h-32 mb-6 border border-cyber-red/30 overflow-hidden">
        {/* Placeholder for scan-frame digital asset */}
        <div className="absolute inset-0 bg-[url('/hud-scan-placeholder.png')] bg-center bg-no-repeat bg-contain"></div>

        {/* Scan progress overlay */}
        {isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
            <div className="w-full max-w-[80%] h-2 bg-black/50 mb-2">
              <div
                className="h-full bg-cyber-red"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
            <div className="text-xs text-cyber-red">
              SCANNING: {scanProgress}%
            </div>
          </div>
        )}

        {/* User ID display when scan complete */}
        {scanComplete && user && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-cyber-yellow text-lg font-bold mb-1">
              {user.name || `USER-${user.id}`}
            </div>
            <div className="text-cyber-red text-xs">
              {user.affiliation || 'UNKNOWN AFFILIATION'}
            </div>
          </div>
        )}
      </div>

      {user ? (
        <div className="space-y-4">
          {/* Main scan data section */}
          <div className="border-l-2 border-cyber-red pl-3">
            <h3 className="text-cyber-yellow text-lg mb-2 font-heading uppercase tracking-wider">
              Scan Results
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-cyber-red">ID:</span> {user.id}
              </li>
              <li>
                <span className="text-cyber-red">COORDINATES:</span>{' '}
                {user.lat.toFixed(4)}, {user.lng.toFixed(4)}
              </li>
              <li>
                <span className="text-cyber-red">STATUS:</span>{' '}
                <span
                  className={
                    user.status === 'ACTIVE'
                      ? 'text-cyber-green'
                      : 'text-cyber-blue'
                  }
                >
                  {user.status}
                </span>
              </li>
              <li>
                <span className="text-cyber-red">LAST PING:</span>{' '}
                {new Date().toLocaleTimeString()}
              </li>
            </ul>
          </div>

          {/* Additional data sections that appear after scan completes */}
          {scanComplete && userDetails && (
            <>
              <div className="border-l-2 border-cyber-blue pl-3 mt-4">
                <h4 className="text-cyber-blue text-base mb-1 uppercase">
                  Background
                </h4>
                <p className="text-gray-300 text-sm">
                  {userDetails.background}
                </p>
              </div>

              <div className="border-l-2 border-cyber-green pl-3 mt-4">
                <h4 className="text-cyber-green text-base mb-1 uppercase">
                  Skills
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  {userDetails.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className="border-l-2 border-cyber-yellow pl-3 mt-4">
                <h4 className="text-cyber-yellow text-base mb-1 uppercase">
                  Affiliation
                </h4>
                <p className="text-gray-300 text-sm">
                  {userDetails.affiliation}
                </p>
              </div>

              <div className="text-xs text-cyber-red mt-6 opacity-70 border-t border-cyber-red/30 pt-2">
                <div>INFOCOMP 2077</div>
                <div>SCAN DATA CLASSIFIED LEVEL 2</div>
                <div>AUTHORIZED ACCESS ONLY</div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100%-8rem)] text-center">
          <div className="text-cyber-red text-lg mb-2">NO TARGET SELECTED</div>
          <p className="text-gray-400 text-sm max-w-xs">
            Hover over a ping on the map to scan user data...
          </p>
          <div className="mt-6 w-16 h-16 border-2 border-cyber-red/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cyber-red/40 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-cyber-red/60 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="mt-4 text-xs text-cyber-red/60">SCAN READY</div>
        </div>
      )}

      {/* Animated scan bars */}
      <div className="scan-bars mt-4 h-2 bg-cyber-red/10 overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full w-full">
          <div className="h-full w-[20%] bg-cyber-red/30 animate-[scanBar_3s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style>{`
        @keyframes scanBar {
          0%,
          100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(500%);
          }
        }
      `}</style>
    </div>
  );
};

export default DetailsPanel;
