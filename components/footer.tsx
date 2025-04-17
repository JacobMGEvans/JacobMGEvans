import { flex, footerStyle, paragraph, socialIcon } from '../css-utilities';

export function FooterComponent() {
  const currentYear = new Date().getFullYear();
  return (
    <footer class={footerStyle()}>
      <div class="container mx-auto">
        <div class={flex('col', 'md:flex-row justify-between items-center')}>
          <div class="mb-6 md:mb-0">
            <div class={flex('row', 'items-center space-x-2')}>
              <span class="text-xl font-heading font-bold">
                Jacob M.G. Evans
              </span>
            </div>
            <p class={paragraph('small')}>
              FullStack Developer, OSS Contributor, Veteran & Outdoor Enthusiast
            </p>
          </div>

          <div class={flex('row', 'space-x-6')}>
            <a
              href="https://www.linkedin.com/in/jacob-m-g-evans"
              aria-label="LinkedIn"
              class={socialIcon()}
            >
              <i class="fab fa-linkedin text-2xl"></i>
            </a>
            <a
              href="https://twitter.com/JacobMGEvans"
              aria-label="Twitter"
              class={socialIcon()}
            >
              <i class="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="https://github.com/JacobMGEvans"
              aria-label="GitHub"
              class={socialIcon()}
            >
              <i class="fab fa-github text-2xl"></i>
            </a>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; ${currentYear} Jacob M.G. Evans. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
