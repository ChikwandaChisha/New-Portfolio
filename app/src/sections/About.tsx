import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionHeading } from '@/components/SectionHeading';

const awards = [
  'Dartmouth Honor List',
  'EE Just STEM Fellow',
  'EE Just Research Fund',
  'First Quantum Mine Scholarship',
];

const coursework = [
  'Machine Learning',
  'NLP',
  'Software Design',
  'Game Theory',
  'Privacy & Cyber Security',
  'Data Structures & Algorithms',
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading index="01" title="About" note="Who I am" />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <ScrollReveal className="lg:col-span-5">
            <div className="relative border border-border rounded-sm overflow-hidden bg-card">
              <img
                src="/profile-new.jpg"
                alt="Chikwanda Chisha"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
            </div>
            <p className="label-mono text-muted-foreground mt-3">Chikwanda Chisha</p>
          </ScrollReveal>

          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                <p>
                  I'm a computer science student at Dartmouth working at the intersection of
                  AI, security, and systems. My work spans published robotics research, an AI
                  mental-health chatbot serving thousands of students, and secure platform
                  engineering.
                </p>
                <p>
                  I care about software that's precise, reliable, and genuinely useful. Outside
                  the terminal, you'll usually find me cooking.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <dl className="mt-10 grid sm:grid-cols-2 gap-px bg-border border border-border rounded-sm overflow-hidden">
                <div className="bg-background p-5">
                  <dt className="label-mono text-muted-foreground">Experience</dt>
                  <dd className="mt-2 text-2xl font-semibold text-foreground">3+ years</dd>
                  <dd className="text-sm text-muted-foreground mt-1">Research &amp; industry</dd>
                </div>
                <div className="bg-background p-5">
                  <dt className="label-mono text-muted-foreground">Education</dt>
                  <dd className="mt-2 text-2xl font-semibold text-foreground">Dartmouth</dd>
                  <dd className="text-sm text-muted-foreground mt-1">BA Computer Science, 2022–2026</dd>
                </div>
              </dl>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mt-10">
                <h3 className="label-mono text-muted-foreground mb-4">Awards &amp; Honors</h3>
                <ul className="grid sm:grid-cols-2 gap-y-2.5 gap-x-6">
                  {awards.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mt-10">
                <h3 className="label-mono text-muted-foreground mb-4">Relevant Coursework</h3>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((c) => (
                    <span
                      key={c}
                      className="font-mono text-xs text-muted-foreground border border-border rounded-sm px-2.5 py-1"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
