import {
  flex,
  heading,
  link,
  ossPreviewImage,
  paragraph,
  previewContainer,
  sectionContainer,
} from '../../../css-utilities';

export function OssSection() {
  return (
    <section id="oss" className={sectionContainer('content-section')}>
      <h2 className={heading('h2')}>
        OSS Contributions & Community Involvement
      </h2>
      <div className={flex('row', 'flex-wrap justify-center gap-6 mb-6')}>
        <a href="https://dev.to/jacobmgevans" className={previewContainer()}>
          <img
            src="https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/hacktober2019.webp"
            alt="2019 Hacktoberfest Contributor"
            className={ossPreviewImage()}
          />
        </a>
        <a href="https://dev.to/jacobmgevans" className={previewContainer()}>
          <img
            src="https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/hacktober2020.webp"
            alt="2020 Hacktoberfest Contributor"
            className={ossPreviewImage()}
          />
        </a>
        <a href="https://dev.to/jacobmgevans" className={previewContainer()}>
          <img
            src="https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/hacktober2021.webp"
            alt="2021 Hacktoberfest Contributor"
            className={ossPreviewImage()}
          />
        </a>
        <a href="https://osrg.t3.gg/" className={previewContainer()}>
          <img
            src="https://github.com/JacobMGEvans/JacobMGEvans/raw/main/public/osrg.webp"
            alt="Open Source Raid Guild Member"
            className={ossPreviewImage()}
          />
        </a>
      </div>
      <p className={paragraph('light')}>
        Part of my open-source work and learning in public involves writing
        technical (and sometimes less technical) blog posts. My goal is for
        others, and my future self, to benefit from them.
      </p>
      <details
        open
        className="w-full bg-forest-dark/80 p-6 rounded-lg my-4 border border-mountain-purple/30 transition-all duration-300 hover:border-mountain-purple shadow-md"
      >
        <summary className="cursor-pointer font-semibold text-mountain-blue hover:text-mountain-purple transition-colors duration-300 text-xl flex items-center gap-2">
          <span>📚</span> <span>Some of My Blog Articles & Other Content</span>
        </summary>
        <ul className="flex flex-col gap-3 my-4 px-2">
          <li>
            <a
              href="https://podrocket.logrocket.com/cloudflare-workers"
              className={link('underline')}
            >
              Guest on LogRocket - Cloudflare Workers
            </a>
          </li>
          <li>
            <a
              href="https://dev.to/jacobmgevans/javascript-resources-podcasts-books-videos-and-tutorials-4a6e"
              className={link('underline')}
            >
              JavaScript Resources: Podcasts, Books, Videos, and Tutorials
            </a>
          </li>
          <li>
            <a
              href="https://dev.to/jacobmgevans/more-podcasts-and-video-programming-resources-5a8k"
              className={link('underline')}
            >
              More Podcasts and Video Programming Resources
            </a>
          </li>
          <li>
            <a
              href="https://dev.to/jacobmgevans/should-you-listen-to-podcasts-4m5j"
              className={link('underline')}
            >
              Should You Listen to Podcasts?
            </a>
          </li>
          <li>
            <a
              href="https://dev.to/jacobmgevans/writing-immutable-javascript-why-how-3if6"
              className={link('underline')}
            >
              Writing Immutable and Functional JavaScript
            </a>
          </li>
        </ul>
      </details>
      <style>
        {`.drop-shadow-glow {
        text-shadow: 0 0 12px #8B5CF6, 0 0 24px #3B82F6;
      }
      .glow-animate {
        box-shadow: 0 0 0px #8B5CF6, 0 0 0px #3B82F6;
        transition: box-shadow 0.4s;
      }`}
      </style>
    </section>
  );
}
