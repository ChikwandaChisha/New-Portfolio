import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer';
import {
  Code2,
  Palette,
  FileCode,
  Braces,
  Atom,
  Smartphone,
  Database,
  Coffee,
  GitBranch,
  Server,
  Cpu,
  Terminal,
  BookOpen, // Added BookOpen
  Briefcase // Added Briefcase
} from 'lucide-react';

const frontendSkills = [
  { name: 'React.js', level: 'Advanced', icon: Atom },
  { name: 'React Native', level: 'Intermediate', icon: Smartphone },
  { name: 'TypeScript', level: 'Intermediate', icon: Braces },
  { name: 'Tailwind CSS', level: 'Advanced', icon: Palette },
  { name: 'HTML5', level: 'Advanced', icon: FileCode },
  { name: 'CSS', level: 'Advanced', icon: Palette },
  { name: 'JavaScript', level: 'Advanced', icon: Code2 },
];

const backendSkills = [
  { name: 'Python', level: 'Advanced', icon: Terminal },
  { name: 'Java', level: 'Advanced', icon: Coffee },
  { name: 'C/C++', level: 'Intermediate', icon: Cpu },
  { name: 'Node.js', level: 'Intermediate', icon: Server },
  { name: 'SQL', level: 'Intermediate', icon: Database },
  { name: 'Supabase', level: 'Intermediate', icon: Server },
  { name: 'Git/GitHub', level: 'Advanced', icon: GitBranch },
  { name: 'Jupyter', level: 'Intermediate', icon: BookOpen },
];

const experiences = [

  {
    company: 'Microsoft',
    role: 'Security Emerging Leader',
    period: 'Jul 2025 – Aug 2025',
    description: 'Selected for leadership program focusing on cloud security, threat intelligence, and secure software development practices.',
    skills: ['Security', 'Cloud', 'Leadership']
  },
  {
    company: 'The Takeoff Institute',
    role: 'Software Engineering Fellow',
    period: 'Jun 2025 – Aug 2025',
    description: 'Designed scalable repository platform architecture with secure authentication and role-based access control.',
    skills: ['System Design', 'Next.js', 'PostgreSQL']
  },
  {
    company: 'Evergreen AI',
    role: 'AI Project Assistant',
    period: 'May 2025 – Aug 2025',
    description: 'Contributed to AI mental health chatbot serving 4,000+ students. Ensured data safety and model robustness.',
    skills: ['AI/ML', 'Data Annotation', 'Healthcare']
  },
  {
    company: 'EE Just Research Program',
    role: 'Research Intern',
    period: 'May 2023 – Aug 2023',
    description: 'Developed StarBlocks soft robotics system. Published research in IEEE Robotics and Automation Letters.',
    skills: ['Robotics', 'Python', 'Deep Learning']
  }
];

function SkillCard({ skill }: { skill: typeof frontendSkills[0] }) {
  const Icon = skill.icon;

  return (
    <motion.div
      whileHover={{ y: -4, borderColor: 'rgba(0, 212, 255, 0.4)' }}
      transition={{ duration: 0.3 }}
      className="p-4 rounded-xl border border-border bg-card/30 hover:bg-card/50 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center group-hover:bg-cyan/20 transition-colors"
          whileHover={{ rotate: 10 }}
        >
          <Icon size={20} className="text-cyan" />
        </motion.div>
        <div>
          <h4 className="text-white font-medium text-sm">{skill.name}</h4>
          <p className="text-white/50 text-xs">{skill.level}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceCard({ experience }: { experience: typeof experiences[0] }) {
  return (
    <motion.div
      className="relative pl-8 pb-12 border-l border-white/10 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-cyan shadow-[0_0_10px_rgba(0,212,255,0.5)]" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <h3 className="text-xl font-bold text-white">{experience.role}</h3>
        <span className="text-sm text-cyan font-mono bg-cyan/5 px-2 py-1 rounded border border-cyan/20 w-fit">
          {experience.period}
        </span>
      </div>

      <div className="text-lg text-white/80 mb-3 font-medium">{experience.company}</div>

      <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-2xl">
        {experience.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {experience.skills.map(skill => (
          <span key={skill} className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/50 border border-white/5">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Pulsing gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.03) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.04) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Floating code symbols */}
        <motion.div
          className="absolute top-20 right-20 text-cyan/10 text-6xl font-mono"
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {'</>'}
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 text-cyan/10 text-5xl font-mono"
          animate={{
            y: [0, 15, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          {'{}'}
        </motion.div>

        {/* Animated connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <motion.line
            x1="10%"
            y1="20%"
            x2="30%"
            y2="60%"
            stroke="rgba(0, 212, 255, 0.5)"
            strokeWidth="1"
            animate={{
              strokeOpacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.line
            x1="70%"
            y1="30%"
            x2="90%"
            y2="70%"
            stroke="rgba(0, 212, 255, 0.5)"
            strokeWidth="1"
            animate={{
              strokeOpacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-cyan text-sm font-medium uppercase tracking-widest mb-4">
            Explore My
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Experience</h2>
        </ScrollReveal>

        <div className="mt-20">
          <ScrollReveal>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Briefcase className="text-cyan" />
              Work Experience
            </h3>
          </ScrollReveal>

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} experience={exp} />
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-20">
          {/* Frontend */}
          <div>
            <ScrollReveal delay={0.1}>
              <motion.h3
                className="text-xl font-semibold text-white mb-6 flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <motion.span
                  className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(0, 212, 255, 0)',
                      '0 0 15px 3px rgba(0, 212, 255, 0.2)',
                      '0 0 0 0 rgba(0, 212, 255, 0)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Code2 size={20} className="text-cyan" />
                </motion.span>
                Frontend Development
              </motion.h3>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3" staggerDelay={0.05} delayStart={0.2}>
              {frontendSkills.map((skill) => (
                <StaggerItem key={skill.name}>
                  <SkillCard skill={skill} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Backend */}
          <div>
            <ScrollReveal delay={0.2}>
              <motion.h3
                className="text-xl font-semibold text-white mb-6 flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <motion.span
                  className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(0, 212, 255, 0)',
                      '0 0 15px 3px rgba(0, 212, 255, 0.2)',
                      '0 0 0 0 rgba(0, 212, 255, 0)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5,
                  }}
                >
                  <Server size={20} className="text-cyan" />
                </motion.span>
                Backend Development
              </motion.h3>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3" staggerDelay={0.05} delayStart={0.3}>
              {backendSkills.map((skill) => (
                <StaggerItem key={skill.name}>
                  <SkillCard skill={skill} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
