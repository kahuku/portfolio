// src/App.tsx
import "./App.css";

type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  techStack: string[];
  status?: string;
};

const projects: Project[] = [
  {
    slug: "redactle",
    name: "Redactle Clone",
    tagline: "Word-guessing game based on redacted Wikipedia articles.",
    description:
      "A Redactle-style word game that focuses on clean UX, efficient search, and a scalable architecture. Great for showing full-stack skills and text processing logic.",
    techStack: ["React", "TypeScript", "Flask", "PostgreSQL", "AWS"],
  },
  {
    slug: "myverifi",
    name: "MyVerifi",
    tagline: "Smart verification and workflow tooling.",
    description:
      "A project centered on verification workflows, data integrity, and clean API design. Highlights backend modeling and integration with external services.",
    techStack: ["React", "TypeScript", "Python", "AWS"],
  },
];

function App() {
  return (
    <div className="app">
      {/* Top navigation */}
      <header className="app-header">
        <div className="app-header-inner">
          <div className="logo">kahuku.dev</div>
          <nav className="nav">
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-inner">
            <p className="hero-eyebrow">Hi, I&apos;m Drew 👋</p>
            <h1 className="hero-title">
              I build full-stack systems with React, Python, and AWS.
            </h1>
            <p className="hero-subtitle">
              Technical consultant & full-stack developer focused on clean
              architecture, cloud infrastructure, and shipping real products
              end-to-end.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="button primary">
                View projects
              </a>
              <a href="#contact" className="button secondary">
                Get in touch
              </a>
            </div>

            <div className="hero-tags">
              <span>React / TypeScript</span>
              <span>Python / Flask</span>
              <span>AWS (S3, CloudFront, ECS, RDS)</span>
              <span>DevOps & CI/CD</span>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section">
          <div className="section-header">
            <h2>Featured projects</h2>
            <p>
              A few things I&apos;ve built recently. Each project is an
              opportunity to show end-to-end ownership: design, implementation,
              and deployment.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.slug} className="project-card">
                <div className="project-card-body">
                  <h3>{project.name}</h3>
                  <p className="project-tagline">{project.tagline}</p>
                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="project-tech">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-card-footer">
                  {/* Later this becomes a real route like /projects/redactle */}
                  <button
                    className="text-button"
                    onClick={() =>
                      console.log(`TODO: navigate to /projects/${project.slug}`)
                    }
                  >
                    View case study →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="section section-muted">
          <div className="section-inner">
            <h2>About me</h2>
            <p>
              I&apos;m a full-stack developer & technical consultant who likes
              building real products: frontend, backend, infrastructure, and
              automation. Most of my work lives in the React + TypeScript +
              Python ecosystem, deployed on AWS.
            </p>
            <p>
              I care about clear code, reliable systems, and shipping things
              that actually get used. This portfolio is both a playground for
              new ideas and a home for the projects I&apos;m proud of.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section">
          <div className="section-inner contact">
            <h2>Contact</h2>
            <p>
              Want to talk about a project, role, or idea? I&apos;m always open
              to interesting problems and collaborations.
            </p>
            <div className="contact-links">
              {/* Swap these placeholders for your actual links */}
              <a
                // href="mailto:you@example.com"
                className="button primary"
              >
                Email me
              </a>
              <a
                href="https://www.linkedin.com/in/drewwilson2002"
                target="_blank"
                rel="noreferrer"
                className="button secondary"
              >
                View LinkedIn
              </a>
              <a
                href="https://github.com/kahuku"
                target="_blank"
                rel="noreferrer"
                className="button ghost"
              >
                View GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>© {new Date().getFullYear()} kahuku.dev</span>
          <span>Built with React, TypeScript, and AWS</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
