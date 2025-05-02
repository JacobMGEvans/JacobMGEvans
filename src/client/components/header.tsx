import {
  badge,
  flex,
  gradientHeader,
  link,
  socialIcon,
} from '../../../css-utilities';
const getNavLink = (section: string) => {
  if (section.startsWith('#')) {
    return `/${section}`;
  }
  return section.startsWith('/') ? section : `/${section}`;
};

export function HeaderComponent() {
  return (
    <header
      className={`sticky top-0 z-50 w-full p-4 ${gradientHeader()} backdrop-blur-md border-b border-gray-800 text-gray-100 flex flex-col md:flex-row justify-between items-center`}
    >
      <div className={`${flex('row', 'items-center gap-4')}`}>
        <div className="wolf-icon">
          <a href="https://jacobmgevans.com">
            <img
              src="https://pbs.twimg.com/media/GJ22wSNb0AAQRAH?format=jpg&name=large"
              alt="Wolf Icon"
              className="h-8 w-8 rounded-full shadow-md"
            />
          </a>
        </div>
        <div className={flex('column', 'gap-8')}>
          <h1 className="text-xl font-heading font-bold">Jacob M.G. Evans</h1>
        </div>
        <div className={flex('row', 'items-center gap-2')}>
          <a
            href="https://www.linkedin.com/in/jacob-m-g-evans"
            aria-label="LinkedIn"
            className={socialIcon()}
          >
            <i className="fab fa-linkedin text-xl"></i>
          </a>
          <a
            href="https://twitter.com/JacobMGEvans"
            aria-label="Twitter"
            className={socialIcon()}
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="https://github.com/JacobMGEvans"
            aria-label="GitHub"
            className={socialIcon()}
          >
            <i className="fab fa-github text-xl"></i>
          </a>
        </div>
      </div>
      <nav className="mt-4 md:mt-0">
        <ul className={flex('row', 'gap-6')}>
          <li>
            <a href={getNavLink('#about')} className={link('nav')}>
              About
            </a>
          </li>
          <li>
            <a href={getNavLink('#oss')} className={link('nav')}>
              OSS & Community
            </a>
          </li>
          <li>
            <a href={getNavLink('/blog')} className={link('nav')}>
              Blog
            </a>
          </li>
          <li>
            <a href={getNavLink('#outdoor')} className={link('nav')}>
              Outdoor Life
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
