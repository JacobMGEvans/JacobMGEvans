import React, { useEffect } from 'react';
import runSiteAnimations from './hooks/useSiteAnimations';
import runBlogAnimations from './hooks/runBlogAnimations';
import Overlay from './components/Overlay';

const App: React.FC = () => {
  useEffect(() => {
    if (window.location.pathname === '/blog') {
      runBlogAnimations();
    } else {
      runSiteAnimations();
    }
  }, []);

  return <Overlay />;
};

export { App };
