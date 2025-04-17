import {
  grid,
  heading,
  imageContainer,
  list,
  paragraph,
  responsiveImage,
  sectionContainer,
} from '../css-utilities';

export function OutdoorSectionComponent() {
  return (
    <section id="outdoor" class={sectionContainer()}>
      <h2 class={heading('h2')}>Outdoor Life</h2>
      <div class={grid()}>
        <div>
          <h3 class={heading('h3')}>Hiking & Camping</h3>
          <p class={paragraph()}>
            As an avid outdoor enthusiast, I find peace and inspiration in
            nature. Hiking through forests and mountains connects me with the
            natural world and fuels my creativity.
          </p>
          <ul class={list()}>
            <li>Experienced backpacker with multi-day trail experience</li>
            <li>Camping in all seasons and weather conditions</li>
            <li>Passionate about wildlife conservation</li>
          </ul>
        </div>
        <div class={imageContainer()}>
          <img
            src="https://pbs.twimg.com/media/GTnMCppa4AEqRtH?format=jpg&name=large"
            alt="Forest hiking trail"
            class={responsiveImage()}
          />
        </div>
      </div>

      <div class={`mt-12 ${grid()}`}>
        <div class={imageContainer(true)}>
          <img
            src="https://img.freepik.com/premium-photo/wolf-wolf-silhouette-dark-fantasy-forest-wolf_1168123-40178.jpg"
            alt="Wolf in natural habitat"
            class={responsiveImage()}
          />
        </div>
        <div class="order-1 md:order-2">
          <h3 class={heading('h3')}>Wolf Appreciation</h3>
          <p class={paragraph()}>
            Wolves represent the perfect balance of intelligence, strength, and
            community - values I strive to embody in both my personal and
            professional life.
          </p>
          <p class={paragraph()}>
            Their adaptability and resilience in challenging environments
            mirrors the mindset needed in the ever-evolving tech landscape.
          </p>
        </div>
      </div>
    </section>
  );
}
