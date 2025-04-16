export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full p-4 bg-gradient-to-r from-forest-dark via-wolf-dark to-forest-dark backdrop-blur-md border-b border-gray-800 text-gray-100 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="wolf-icon">
          <img
            src="https://pbs.twimg.com/media/GJ22wSNb0AAQRAH?format=jpg&name=large"
            alt="Wolf Icon"
            className="h-8 w-8 rounded-full shadow-lg"
          />
        </div>
        <h1 className="text-xl font-heading font-bold">Jacob M.G. Evans</h1>
        <div className="flex items-center space-x-2">
          <a
            href="https://www.linkedin.com/in/jacob-m-g-evans"
            aria-label="LinkedIn"
            className="hover:text-mountain-blue transition-colors"
          >
            <i className="fab fa-linkedin text-xl"></i>
          </a>
          <a
            href="https://twitter.com/JacobMGEvans"
            aria-label="Twitter"
            className="hover:text-mountain-blue transition-colors"
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="https://github.com/JacobMGEvans"
            aria-label="GitHub"
            className="hover:text-mountain-blue transition-colors"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
        </div>
      </div>
      <nav className="mt-4 md:mt-0">
        <ul className="flex space-x-6">
          <li>
            <a href="#about" className="nav-link font-medium">
              About
            </a>
          </li>
          <li>
            <a href="#oss" className="nav-link font-medium">
              OSS & Community
            </a>
          </li>
          <li>
            <a href="#blog" className="nav-link font-medium">
              Blog
            </a>
          </li>
          <li>
            <a href="#outdoor" className="nav-link font-medium">
              Outdoor Life
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
