import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer';
import { ExternalLink, Github, Lock, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    id: 1,
    title: 'CyptNote',
    description: 'Secure networking platform using React, Node.js, and Supabase. Features end-to-end RSA encryption, role-based access control, and audit logging.',
    category: 'Full Stack & Security',
    tech: ['React', 'Node.js', 'Supabase', 'PostgreSQL'],
    github: 'https://github.com/chikwanda/cryptnote',
    demo: null,
    color: 'from-cyan/20 to-blue-500/20',
  },
  {
    id: 2,
    title: 'Swahili Toxicity Detection',
    description: 'AI model classifying Swahili tweets (neutral, offensive, hate) using XLM-Roberta. Achieved 0.486 Macro F1-score on imbalanced datasets.',
    category: 'AI / ML',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'Scikit-learn'],
    github: null,
    demo: null,
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 3,
    title: 'SoundSwipe',
    description: 'Mobile music discovery app integrating Apple Music API. Features AI-powered recommendations and real-time library synchronization.',
    category: 'Mobile App',
    tech: ['React Native', 'Expo', 'Python', 'OAuth 2.0'],
    github: null,
    demo: null,
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 4,
    title: 'Search Engine',
    description: 'High-performance search engine built in C++ using multi-threading and inverted indexing. Efficiently ranks results from 1000+ HTML documents.',
    category: 'Systems & C++',
    tech: ['C++', 'Multi-threading', 'Inverted Indexing', 'Algorithms'],
    github: null,
    demo: null,
    color: 'from-emerald-500/20 to-green-500/20',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="group relative rounded-2xl border border-border bg-card/30 overflow-hidden hover:border-cyan/40 transition-colors duration-300"
    >
      {/* Animated glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Project Number */}
      <div className="absolute top-4 left-4 z-10">
        <motion.span
          className="text-6xl font-bold text-white/5 group-hover:text-cyan/10 transition-colors"
          animate={{
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          0{index + 1}
        </motion.span>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 relative z-10">
        {/* Category Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
        >
          <Badge
            variant="outline"
            className="mb-4 border-cyan/30 text-cyan bg-cyan/5 hover:bg-cyan/10"
          >
            {project.category}
          </Badge>
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-white/60 mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, i) => (
            <motion.span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/70 border border-white/10 hover:border-cyan/30 hover:text-cyan transition-colors"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-cyan transition-colors"
              whileHover={{ x: 3 }}
            >
              <Github size={18} />
              <span className="text-sm">Code</span>
            </motion.a>
          )}
          {project.demo ? (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-cyan transition-colors"
              whileHover={{ x: 3 }}
            >
              <ExternalLink size={18} />
              <span className="text-sm">Live Demo</span>
            </motion.a>
          ) : (
            <span className="flex items-center gap-2 text-white/30 cursor-not-allowed">
              <Lock size={18} />
              <span className="text-sm">Private</span>
            </span>
          )}
        </div>
      </div>

      {/* Hover Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-10 left-10 w-12 h-12 border border-cyan/10 rotate-45"
          animate={{
            rotate: [45, 135, 45],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-8 h-8 border border-cyan/10"
          animate={{
            y: [0, -40, 0],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-16 h-16 border border-cyan/5 rounded-xl rotate-12"
          animate={{
            y: [0, 30, 0],
            rotate: [12, 60, 12],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-8 h-8 rounded-full border border-cyan/10"
          animate={{
            scale: [1, 1.5, 1],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Pulsing orbs */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.04) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Animated grid dots */}
        <div className="absolute inset-0 opacity-[0.02]">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan"
              style={{
                left: `${(i % 6) * 16 + 8}%`,
                top: `${Math.floor(i / 6) * 20 + 10}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.p
            className="text-cyan text-sm font-medium uppercase tracking-widest mb-4 flex items-center justify-center gap-2"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles size={14} />
            Browse My Recent
            <Sparkles size={14} />
          </motion.p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Projects</h2>
        </ScrollReveal>

        {/* Projects Grid */}
        <StaggerContainer
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          staggerDelay={0.15}
          delayStart={0.1}
        >
          {projects.map((project, index) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* More Projects Coming */}
        <ScrollReveal delay={0.4} className="mt-12 text-center">
          <motion.p
            className="text-white/40 text-sm"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            More projects coming soon...
          </motion.p>
        </ScrollReveal>
      </div>
    </section>
  );
}
