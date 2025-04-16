import {
  grid,
  heading,
  list,
  paragraph,
  sectionContainer,
} from '../css-utilities';

export function AboutSectionComponent() {
  return (
    <section id="about" class={sectionContainer()}>
      <h2 class={heading('h2')}>Professional Journey</h2>
      <div class={grid()}>
        <div>
          <h3 class={heading('h3')}>Current Role</h3>
          <p class={paragraph()}>
            FullStack Egnineer, specializing in Cloudflare Workers, CI/CD
            (DevOps), UX/DX, tooling, webapps, and cloud infrastructure.
            Building secure, scalable authentication and user management
            solutions.
          </p>
          <h4 class={heading('h4')}>Core Skills</h4>
          <ul class={list()}>
            <li>FullStack development with TypeScript and React</li>
            <li>Cloud infrastructure and serverless architecture</li>
            <li>Authentication and security implementations</li>
            <li>Performance optimization and scalability</li>
          </ul>
        </div>
        <div>
          <h3 class={heading('h3')}>Open Source & Community</h3>
          <p class={paragraph()}>
            Active contributor and maintainer in the open-source community,
            focusing on developer tools and educational resources.
          </p>
          <h4 class={heading('h4')}>Contributions & Leadership</h4>
          <ul class={list()}>
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
