export function About() {
  return (
    <section
      id="about"
      className="max-w-3xl mx-auto my-16 p-10 rounded-2xl shadow-2xl flex flex-col items-center bg-gradient-to-br from-wolf-dark/90 via-forest-dark/80 to-mountain-blue/60 border border-mountain-purple/40 backdrop-blur-lg animate-fade-in"
    >
      <h2 className="text-4xl font-heading font-extrabold text-mountain-purple mb-8 text-center drop-shadow-glow">
        Professional Journey
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-heading font-semibold mb-4 text-mountain-blue">
            Current Role
          </h3>
          <p className="text-gray-300 mb-4">
            FullStack Engineer, specializing in Cloudflare Workers, CI/CD
            (DevOps), UX/DX, tooling, webapps, and cloud infrastructure.
            Building secure, scalable authentication and user management
            solutions.
          </p>
          <h4 className="text-lg font-heading font-semibold mb-2 text-mountain-blue">
            Core Skills
          </h4>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>FullStack development with TypeScript and React</li>
            <li>Cloud infrastructure and serverless architecture</li>
            <li>Authentication and security implementations</li>
            <li>Performance optimization and scalability</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-heading font-semibold mb-4 text-mountain-blue">
            Open Source & Community
          </h3>
          <p className="text-gray-300 mb-4">
            Active contributor and maintainer in the open-source community,
            focusing on developer tools and educational resources.
          </p>
          <h4 className="text-lg font-heading font-semibold mb-2 text-mountain-blue">
            Contributions & Leadership
          </h4>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Technical moderator for major tech communities</li>
            <li>Regular contributor to developer education</li>
            <li>Open Source Raid Guild leadership</li>
            <li>Veteran mentor at VetsWhoCode</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
