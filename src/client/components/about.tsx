import {
  grid,
  heading,
  list,
  paragraph,
  sectionContainer,
} from '../../../css-utilities';

export function AboutSection() {
  return (
    <section id="about" className={sectionContainer()}>
      <h2 className={heading('h2')}>Professional Journey</h2>
      <div className={grid()}>
        <div>
          <h3 className={heading('h3')}>Current Role</h3>
          <p className={paragraph()}>
            FullStack Egnineer, specializing in Cloudflare Workers, CI/CD
            (DevOps), UX/DX, tooling, webapps, and cloud infrastructure.
            Building secure, scalable authentication and user management
            solutions.
          </p>
          <h4 className={heading('h4')}>Core Skills</h4>
          <ul className={list()}>
            <li>FullStack development with TypeScript and React</li>
            <li>
              Cloud infrastructure and serverless architecture, especially
              Cloudflare
            </li>
            <li>Authentication and security implementations</li>
            <li>Performance optimization and scalability</li>
          </ul>
        </div>
        <div>
          <h3 className={heading('h3')}>Open Source & Community</h3>
          <p className={paragraph()}>
            Active contributor and maintainer in the open-source community,
            focusing on developer tools and educational resources.
          </p>
          <h4 className={heading('h4')}>Contributions & Leadership</h4>
          <ul className={list()}>
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
