import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionHeading } from '@/components/SectionHeading';

const experiences = [
  {
    company: 'Microsoft',
    role: 'Security Emerging Leader',
    period: 'Jul – Aug 2025',
    description:
      'Built cloud-security and threat-intelligence expertise through a Microsoft leadership program focused on secure software development.',
    skills: ['Security', 'Cloud', 'Leadership'],
  },
  {
    company: 'The Takeoff Institute',
    role: 'Software Engineering Fellow',
    period: 'Jun – Aug 2025',
    description:
      'Designed a scalable repository-platform architecture with secure authentication and role-based access control.',
    skills: ['System Design', 'Next.js', 'PostgreSQL'],
  },
  {
    company: 'Evergreen AI',
    role: 'AI Project Assistant',
    period: 'May – Aug 2025',
    description:
      'Strengthened data safety and model robustness for an AI mental-health chatbot serving 4,000+ students.',
    skills: ['AI/ML', 'Data Annotation', 'Healthcare'],
  },
  {
    company: 'EE Just Research Program',
    role: 'Undergraduate Research Intern',
    period: 'May – Aug 2023',
    description:
      'Developed the StarBlocks soft-robotics system; published in IEEE Robotics and Automation Letters.',
    skills: ['Robotics', 'Python', 'Deep Learning'],
  },
  {
    company: 'Dartmouth College',
    role: 'Computer Science TA & Tutor',
    period: 'Jan – Jun 2023',
    description:
      'Tutored students in Calculus and Data Structures & Algorithms in Java, raising grades by an average of one full letter grade while debugging and optimizing 400+ lines of student code.',
    skills: ['Java', 'Teaching', 'Data Structures'],
  },
];

const skills = {
  Frontend: [
    { name: 'React.js', level: 'Intermediate' },
    { name: 'React Native', level: 'Intermediate' },
    { name: 'TypeScript', level: 'Intermediate' },
    { name: 'Tailwind CSS', level: 'Intermediate' },
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'HTML / CSS', level: 'Advanced' },
  ],
  Backend: [
    { name: 'Python', level: 'Advanced' },
    { name: 'Java', level: 'Intermediate' },
    { name: 'C / C++', level: 'Intermediate' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'SQL / Supabase', level: 'Intermediate' },
    { name: 'Git / GitHub', level: 'Advanced' },
    { name: 'Docker', level: 'Intermediate' },
    { name: 'AWS', level: 'Intermediate' },
  ],
};

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading index="03" title="Experience" note="Where I've worked" />

        <div className="border-b border-border">
          {experiences.map((exp) => (
            <ScrollReveal key={exp.company}>
              <div className="grid sm:grid-cols-12 gap-y-3 sm:gap-x-8 py-8 border-t border-border">
                <div className="sm:col-span-3">
                  <span className="label-mono text-muted-foreground">{exp.period}</span>
                </div>
                <div className="sm:col-span-9">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-base text-accent">{exp.company}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-2xl">
                    {exp.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[11px] text-muted-foreground border border-border rounded-sm px-2 py-0.5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-10 lg:gap-16">
          {(Object.keys(skills) as (keyof typeof skills)[]).map((group) => (
            <ScrollReveal key={group}>
              <div>
                <h3 className="label-mono text-muted-foreground mb-5">{group}</h3>
                <ul>
                  {skills[group].map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center justify-between py-2.5 border-t border-border"
                    >
                      <span className="text-sm text-foreground">{s.name}</span>
                      <span className="label-mono text-muted-foreground">{s.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
