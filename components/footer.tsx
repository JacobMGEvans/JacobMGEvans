export function Footer() {
  return (
    <footer className="w-full p-8 bg-gradient-to-r from-forest-dark via-wolf-dark to-forest-dark text-gray-100 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-heading font-bold">
                Jacob M.G. Evans
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              FullStack Developer, OSS Contributor, Veteran & Outdoor Enthusiast
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com/in/jacob-m-g-evans"
              aria-label="LinkedIn"
              className="hover:text-mountain-blue transition-colors"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a
              href="https://twitter.com/JacobMGEvans"
              aria-label="Twitter"
              className="hover:text-mountain-blue transition-colors"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="https://github.com/JacobMGEvans"
              aria-label="GitHub"
              className="hover:text-mountain-blue transition-colors"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>
            &copy; {new Date().getFullYear()} Jacob M.G. Evans. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
