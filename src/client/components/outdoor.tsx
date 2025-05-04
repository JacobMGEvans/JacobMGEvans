import {
  grid,
  heading,
  imageContainer,
  list,
  paragraph,
  responsiveImage,
  sectionContainer,
} from '../../../css-utilities';

export function OutdoorSectionComponent() {
  return (
    <section id="outdoor" className={sectionContainer()}>
      <h2 className={heading('h2')}>Outdoor Life</h2>
      <div className={grid()}>
        <div>
          <h3 className={heading('h3')}>Hiking & Camping</h3>
          <p className={paragraph()}>
            As an avid outdoor enthusiast, I find peace and inspiration in
            nature. Hiking through forests and mountains connects me with the
            natural world and fuels my creativity.
          </p>
          <ul className={list()}>
            <li>Experienced backpacker with multi-day trail experience</li>
            <li>Camping in all seasons and weather conditions</li>
            <li>Passionate about wildlife conservation</li>
          </ul>
        </div>
        <div className={imageContainer()}>
          <img
            src="mt-ellinor-near-peak.webp"
            alt="Forest hiking trail"
            className={responsiveImage()}
          />
        </div>
      </div>

      <div className={`mt-12 ${grid()}`}>
        <div className={imageContainer(true)}>
          <img
            src="/wolf-silhouette-dark-fantasy-forest.avif"
            alt="Wolf in natural habitat"
            className={responsiveImage()}
          />
        </div>
        <div className="order-1 md:order-2">
          <h3 className={heading('h3')}>Wolf Appreciation</h3>
          <p className={paragraph()}>
            Wolves represent the perfect balance of intelligence, strength, and
            community - values I strive to embody in both my personal and
            professional life.
          </p>
          <p className={paragraph()}>
            Their adaptability and resilience in challenging environments
            mirrors the mindset needed in the ever-evolving tech landscape.
          </p>
        </div>
      </div>
    </section>
  );
}
