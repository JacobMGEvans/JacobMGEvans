import { FC, useEffect } from 'react';
import runSiteAnimations from '../hooks/useSiteAnimations';
import { BackgroundElements } from '../components/background';
import { HeaderComponent } from '../components/header';
import { HeroComponent } from '../components/hero';
import { AboutSectionComponent } from '../components/about';
import { OssSectionComponent } from '../components/open-source';
import { OutdoorSectionComponent } from '../components/outdoor';
import { FooterComponent } from '../components/footer';

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
      <HeaderComponent />
      <HeroComponent />

      <main className="container mx-auto px-4 py-8">
        <AboutSectionComponent />
        <OssSectionComponent />
        <OutdoorSectionComponent />

        {readme && (
          <section
            id="about"
            className="content-section max-w-4xl mx-auto my-12 p-8 rounded-md shadow-lg animate-fade-in"
            dangerouslySetInnerHTML={{ __html: readme }}
          />
        )}
      </main>

      <FooterComponent />
    </>
  );
};

export default HomePage;
