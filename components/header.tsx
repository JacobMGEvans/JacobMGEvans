import { flex, gradientHeader, link, socialIcon } from '../css-utilities';

export function HeaderComponent() {
  return (
    <header
      class={`sticky top-0 z-50 w-full p-4 ${gradientHeader()} backdrop-blur-md border-b border-gray-800 text-gray-100 flex flex-col md:flex-row justify-between items-center`}
    >
      <div class={flex('row', 'items-center space-x-4')}>
        <div class="wolf-icon">
          <img
            src="https://pbs.twimg.com/media/GJ22wSNb0AAQRAH?format=jpg&name=large"
            alt="Wolf Icon"
            class="h-8 w-8 rounded-full shadow-lg"
          />
        </div>
        <h1 class="text-xl font-heading font-bold">Jacob M.G. Evans</h1>
        <div class={flex('row', 'items-center space-x-2')}>
          <a
            href="https://www.linkedin.com/in-jacob-m-g-evans"
            aria-label="LinkedIn"
            class={socialIcon()}
          >
            <i class="fab fa-linkedin text-xl"></i>
          </a>
          <a
            href="https://twitter.com/JacobMGEvans"
            aria-label="Twitter"
            class={socialIcon()}
          >
            <i class="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="https://github.com/JacobMGEvans"
            aria-label="GitHub"
            class={socialIcon()}
          >
            <i class="fab fa-github text-xl"></i>
          </a>
        </div>
      </div>
      <nav class="mt-4 md:mt-0">
        <ul class={flex('row', 'space-x-6')}>
          <li>
            <a href="/#about" class={link('nav')}>
              About
            </a>
          </li>
          <li>
            <a href="/#oss" class={link('nav')}>
              OSS & Community
            </a>
          </li>
          <li>
            <a href="/blog" class={link('nav')}>
              Blog
            </a>
          </li>
          <li>
            <a href="/#outdoor" class={link('nav')}>
              Outdoor Life
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
