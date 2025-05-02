import React, { useEffect, useState } from 'react';
import AnimationContainer from './AnimationContainer';

const App: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="app">
      <main>
        {isClient ? (
          <AnimationContainer className="main-animation" />
        ) : (
          <div className="loading">Loading animation...</div>
        )}
      </main>
    </div>
  );
};

export default App;
