interface OpenSourceProps {
  markdown: string;
}

export function OpenSource({ markdown }: OpenSourceProps) {
  return (
    <section
      id="oss"
      className="content-section max-w-3xl mx-auto my-16 p-10 rounded-2xl shadow-2xl animate-fade-in flex flex-col items-center bg-gradient-to-br from-wolf-dark/90 via-forest-dark/80 to-mountain-blue/60 border border-mountain-purple/40 backdrop-blur-lg"
    >
      <h2 className="text-4xl font-heading font-extrabold text-mountain-purple mb-8 text-center drop-shadow-glow">
        OSS Contributions & Community Involvement
      </h2>
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <a
          href="https://dev.to/jacobmgevans"
          className="inline-block p-2 transition-transform duration-300 hover:scale-110"
        >
          <img
            src="https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/hacktober2019.webp"
            alt="2019 Hacktoberfest Contributor"
            className="rounded-xl shadow-xl glow-animate object-cover w-[125px] h-[120px]"
          />
        </a>
        <a
          href="https://dev.to/jacobmgevans"
          className="inline-block p-2 transition-transform duration-300 hover:scale-110"
        >
          <img
            src="https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/hacktober2020.webp"
            alt="2020 Hacktoberfest Contributor"
            className="rounded-xl shadow-xl glow-animate object-cover w-[125px] h-[120px]"
          />
        </a>
        <a
          href="https://dev.to/jacobmgevans"
          className="inline-block p-2 transition-transform duration-300 hover:scale-110"
        >
          <img
            src="https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/hacktober2021.webp"
            alt="2021 Hacktoberfest Contributor"
            className="rounded-xl shadow-xl glow-animate object-cover w-[125px] h-[120px]"
          />
        </a>
        <a
          href="https://osrg.t3.gg/"
          className="inline-block p-2 transition-transform duration-300 hover:scale-110"
        >
          <img
            src="https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/osrg.webp"
            alt="Open Source Raid Guild Member"
            className="rounded-xl shadow-xl glow-animate object-cover w-[125px] h-[120px]"
          />
        </a>
      </div>
      <p className="text-lg text-gray-200 text-center mb-6 max-w-2xl">
        Part of my open-source work and learning in public involves writing
        technical (and sometimes less technical) blog posts. My goal is for
        others, and my future self, to benefit from them.
      </p>
      <details
        open
        className="w-full bg-forest-dark/80 p-6 rounded-xl my-4 border border-mountain-purple/30 transition-all duration-300 hover:border-mountain-purple shadow-lg"
      >
        <summary className="cursor-pointer font-semibold text-mountain-blue hover:text-mountain-purple transition-colors duration-300 text-xl flex items-center gap-2">
          <span>📚</span> <span>Some of My Blog Articles & Other Content</span>
        </summary>
        <ul className="space-y-3 my-4 px-2">
          <li>
            <a
              href="https://podrocket.logrocket.com/cloudflare-workers"
              className="text-mountain-blue hover:text-mountain-purple transition-colors duration-300 hover:underline font-medium"
            >
              Guest on LogRocket - Cloudflare Workers
            </a>
          </li>
          <li>
            <a
              href="https://dev.to/jacobmgevans/javascript-resources-podcasts-books-videos-and-tutorials-4a6e"
              className="text-mountain-blue hover:text-mountain-purple transition-colors duration-300 hover:underline font-medium"
            >
              JavaScript Resources: Podcasts, Books, Videos, and Tutorials
            </a>
          </li>
          <li>
            <a
              href="https://dev.to/jacobmgevans/more-podcasts-and-video-programming-resources-5a8k"
              className="text-mountain-blue hover:text-mountain-purple transition-colors duration-300 hover:underline font-medium"
            >
              More Podcasts and Video Programming Resources
            </a>
          </li>
          <li>
            <a
              href="https://dev.to/jacobmgevans/should-you-listen-to-podcasts-4m5j"
              className="text-mountain-blue hover:text-mountain-purple transition-colors duration-300 hover:underline font-medium"
            >
              Should You Listen to Podcasts?
            </a>
          </li>
          <li>
            <a
              href="https://dev.to/jacobmgevans/writing-immutable-javascript-why-how-3if6"
              className="text-mountain-blue hover:text-mountain-purple transition-colors duration-300 hover:underline font-medium"
            >
              Writing Immutable and Functional JavaScript
            </a>
          </li>
        </ul>
      </details>

      {/* If there's any markdown content to render, we could parse it here */}
      {markdown && markdown.length > 0 && (
        <div
          className="markdown-content mt-8"
          dangerouslySetInnerHTML={{ __html: markdown }}
        />
      )}
    </section>
  );
}
