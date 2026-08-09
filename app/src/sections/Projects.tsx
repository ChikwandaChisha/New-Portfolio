import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer';
import { ArrowRight, ArrowUpRight, Github, Lock } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tech: string[];
  github: string | null;
  demo: string | null;
  /** When set, the card links to an in-app case-study page at #/project/<slug>. */
  slug?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Arbitra',
    description:
      'AI-powered product search and comparison. Natural-language queries return ranked cards with verdicts or side-by-side comparisons, powered by Claude for reasoning and Rainforest for live Amazon data. Built as a Turborepo monorepo.',
    category: 'AI · E-commerce',
    tech: ['Next.js 16', 'React 19', 'Fastify', 'Prisma', 'Turborepo'],
    github: null,
    demo: 'https://arbitraweb-production.up.railway.app/',
    slug: 'arbitra',
  },
  {
    id: 2,
    title: 'CryptNote',
    description:
      'End-to-end encrypted messaging platform with per-user RSA keys, role-based access control, and moderation tooling for reviewing flagged content.',
    category: 'Full Stack · Security',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
    github: 'https://github.com/ChikwandaChisha/CryptNote',
    demo: 'https://crypt-note-rust.vercel.app/',
    slug: 'cryptnote',
  },
  {
    id: 3,
    title: 'Search Engine',
    description:
      'A three-stage search engine in C. A domain-bounded crawler, an inverted-index builder, and a ranked Boolean query engine, all built on custom data structures and runnable end to end with one command.',
    category: 'Systems · C',
    tech: ['C', 'Data Structures', 'Inverted Index'],
    github: 'https://github.com/ChikwandaChisha/Search-Engine',
    demo: null,
    slug: 'search-engine',
  },
  {
    id: 4,
    title: 'Swahili Toxicity Detection',
    description:
      'Three-class Swahili toxicity detection (neutral, offensive, hate) comparing classical ML, a multilingual transformer, and a zero-shot LLM. Linear SVM led with a 0.486 macro-F1.',
    category: 'AI · ML',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'Scikit-learn'],
    github: null,
    demo: null,
    slug: 'swahili-toxicity-detection',
  },
  {
    id: 5,
    title: 'SoundSwipe',
    description:
      'Gesture-driven music discovery. Swipe through Apple Music previews to skip or save, backed by an AI recommender that learns within each session and a React Native swipe deck bridged to Apple MusicKit.',
    category: 'Mobile',
    tech: ['React Native', 'Expo', 'Apple MusicKit', 'Firebase'],
    github: null,
    demo: null,
    slug: 'soundswipe',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // An in-app case study takes priority; otherwise fall back to a live demo or source.
  const detailHref = project.slug ? `#/project/${project.slug}` : undefined;
  const externalHref = project.demo ?? project.github ?? undefined;
  const titleHref = detailHref ?? externalHref;
  const titleExternal = !detailHref && Boolean(externalHref);

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative flex flex-col h-full border border-border rounded-sm bg-card/40 p-6 sm:p-7 transition-colors duration-200 hover:border-accent/50"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="label-mono text-muted-foreground/70">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="label-mono text-muted-foreground text-right">{project.category}</span>
      </div>

      <h3 className="mt-5 text-xl sm:text-2xl font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent">
        {titleHref ? (
          <a
            href={titleHref}
            {...(titleExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="after:absolute after:inset-0"
          >
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

      <div className="mt-6 pt-5 border-t border-border flex flex-wrap items-center gap-x-5 gap-y-3 relative z-10">
        {project.slug && (
          <a
            href={`#/project/${project.slug}`}
            aria-label={`${project.title} case study`}
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:brightness-110 transition"
          >
            <span className="label-mono">Case study</span>
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        )}
        {project.demo && (
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
        )}
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
        {!project.slug && !project.demo && !project.github && (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground/70">
            <Lock size={14} aria-hidden="true" />
            <span className="label-mono">Private</span>
          </span>
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
