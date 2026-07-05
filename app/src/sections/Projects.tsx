import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer';
import { ArrowUpRight, Github, Lock } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Arbitra',
    description:
      'AI-powered product search and comparison. Natural-language queries return ranked results and color-coded comparison tables. Built as a Turborepo monorepo.',
    category: 'AI · E-commerce',
    tech: ['Next.js 15', 'Fastify', 'Prisma', 'PostgreSQL', 'Turborepo'],
    github: null,
    demo: null,
  },
  {
    id: 2,
    title: 'CryptNote',
    description:
      'Secure networking platform with end-to-end RSA encryption, role-based access control, and audit logging.',
    category: 'Full Stack · Security',
    tech: ['React', 'Node.js', 'Supabase', 'PostgreSQL'],
    github: 'https://github.com/chikwanda/cryptnote',
    demo: null,
  },
  {
    id: 3,
    title: 'Search Engine',
    description:
      'High-performance search engine in C++ using multi-threading and inverted indexing. Ranks results across 1,000+ HTML documents.',
    category: 'Systems · C++',
    tech: ['C++', 'Multi-threading', 'Inverted Indexing'],
    github: null,
    demo: null,
  },
  {
    id: 4,
    title: 'Swahili Toxicity Detection',
    description:
      'Classifies Swahili tweets (neutral, offensive, hate) with XLM-Roberta. 0.486 Macro F1 on imbalanced data.',
    category: 'AI · ML',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'Scikit-learn'],
    github: null,
    demo: null,
  },
  {
    id: 5,
    title: 'SoundSwipe',
    description:
      'Mobile music-discovery app on the Apple Music API, with recommendations and real-time library sync.',
    category: 'Mobile',
    tech: ['React Native', 'Expo', 'Python', 'OAuth 2.0'],
    github: null,
    demo: null,
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const primaryHref = project.demo ?? project.github ?? undefined;

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative flex flex-col h-full border border-border rounded-sm bg-card/40 p-6 sm:p-7 transition-colors duration-200 hover:border-accent/50"
    >
      <div className="flex items-center justify-between">
        <span className="label-mono text-muted-foreground/70">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="label-mono text-muted-foreground">{project.category}</span>
      </div>

      <h3 className="mt-5 text-xl sm:text-2xl font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent">
        {primaryHref ? (
          <a href={primaryHref} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[11px] text-muted-foreground border border-border rounded-sm px-2 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-border flex items-center gap-5 relative z-10">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source on GitHub`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={15} aria-hidden="true" />
            <span className="label-mono">Code</span>
          </a>
        )}
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:brightness-110 transition"
          >
            <span className="label-mono">Live</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        ) : (
          !project.github && (
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground/70">
              <Lock size={14} aria-hidden="true" />
              <span className="label-mono">Private</span>
            </span>
          )
        )}
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading index="02" title="Selected Projects" note="What I've built" />

        <StaggerContainer className="grid md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <StaggerItem key={project.id} className="h-full">
              <ProjectCard project={project} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
