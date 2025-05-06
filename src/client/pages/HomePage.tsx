import { FC, useEffect } from 'react';
import runSiteAnimations from '../hooks/useSiteAnimations';
import { BackgroundElements } from '../components/Background';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/About';
import { OssSection } from '../components/OpenSource';
import { Footer } from '../components/Footer';
import { OutdoorSection } from '../components/Outdoor';

export interface HomePageProps {
  readme: string;
}

const HomePage: FC<HomePageProps> = ({ readme }) => {
  useEffect(() => {
    runSiteAnimations();
  }, []);

  return (
    <>
      <BackgroundElements />
      <Header />
      <Hero />

      <main className="container mx-auto px-4 py-8">
        <AboutSection />
        <OssSection />
        <OutdoorSection />

        {readme && (
          <section
            id="about"
            className="content-section max-w-4xl mx-auto my-12 p-8 rounded-md shadow-lg animate-fade-in"
            dangerouslySetInnerHTML={{ __html: readme }}
          />
        )}
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
