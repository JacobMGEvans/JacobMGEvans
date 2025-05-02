import {
  flex,
  footerStyle,
  paragraph,
  socialIcon,
} from '../../../css-utilities';

export function FooterComponent() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={footerStyle()}>
      <div className="container mx-auto">
        <div
          className={flex('col', 'md:flex-row justify-between items-center')}
        >
          <div className="mb-6 md:mb-0">
            <div className={flex('row', 'items-center gap-2')}>
              <span className="text-xl font-heading font-bold">
                Jacob M.G. Evans
              </span>
            </div>
            <p className={paragraph('small')}>
              FullStack Engineer, OSS Contributor, Veteran & Outdoor Enthusiast
            </p>
          </div>

          <div className={flex('row', 'gap-6')}>
            <a
              href="https://www.linkedin.com/in/jacob-m-g-evans"
              aria-label="LinkedIn"
              className={socialIcon()}
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a
              href="https://twitter.com/JacobMGEvans"
              aria-label="Twitter"
              className={socialIcon()}
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="https://github.com/JacobMGEvans"
              aria-label="GitHub"
              className={socialIcon()}
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {currentYear} Jacob M.G. Evans. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
