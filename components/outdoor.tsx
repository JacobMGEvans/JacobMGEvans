export function Outdoor() {
  return (
    <section
      id="outdoor"
      className="max-w-3xl mx-auto my-16 p-10 rounded-2xl shadow-2xl flex flex-col items-center bg-gradient-to-br from-wolf-dark/90 via-forest-dark/80 to-mountain-blue/60 border border-mountain-purple/40 backdrop-blur-lg animate-fade-in"
    >
      <h2 className="text-4xl font-heading font-extrabold text-mountain-purple mb-8 text-center drop-shadow-glow">
        Outdoor Life
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-heading font-semibold mb-4 text-mountain-blue">
            Hiking & Camping
          </h3>
          <p className="text-gray-300 mb-4">
            As an avid outdoor enthusiast, I find peace and inspiration in
            nature. Hiking through forests and mountains connects me with the
            natural world and fuels my creativity.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Experienced backpacker with multi-day trail experience</li>
            <li>Camping in all seasons and weather conditions</li>
            <li>Passionate about wildlife conservation</li>
          </ul>
        </div>
        <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://pbs.twimg.com/media/GTnMCppa4AEqRtH?format=jpg&name=large"
            alt="Forest hiking trail"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
          />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-64 rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
          <img
            src="https://img.freepik.com/premium-photo/wolf-wolf-silhouette-dark-fantasy-forest-wolf_1168123-40178.jpg"
            alt="Wolf in natural habitat"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
          />
        </div>
        <div className="order-1 md:order-2">
          <h3 className="text-xl font-heading font-semibold mb-4 text-mountain-blue">
            Wolf Appreciation
          </h3>
          <p className="text-gray-300 mb-4">
            Wolves represent the perfect balance of intelligence, strength, and
            community - values I strive to embody in both my personal and
            professional life.
          </p>
          <p className="text-gray-300">
            Their adaptability and resilience in challenging environments
            mirrors the mindset needed in the ever-evolving tech landscape.
          </p>
        </div>
      </div>
    </section>
  );
}
