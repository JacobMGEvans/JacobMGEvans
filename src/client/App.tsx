import React, { useEffect } from 'react';
import runSiteAnimations from './hooks/useSiteAnimations';
import runBlogAnimations from './hooks/runBlogAnimations';

const App: React.FC = () => {
  useEffect(() => {
    if (window.location.pathname === '/blog') {
      runBlogAnimations();
    } else {
      runSiteAnimations();
    }
  }, []);

  return null;
};

export default App;
