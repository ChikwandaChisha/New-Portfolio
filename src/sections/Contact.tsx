import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionHeading } from '@/components/SectionHeading';
import { ArrowUpRight, Mail } from 'lucide-react';

const EMAIL = 'chikwanda.chisha@dartmouth.edu';

const channels = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'LinkedIn', value: '/in/chikwanda-chisha', href: 'https://www.linkedin.com/in/chikwanda-chisha' },
  { label: 'GitHub', value: '@chikwanda', href: 'https://github.com/chikwanda' },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading index="04" title="Contact" note="Say hello" />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <ScrollReveal className="lg:col-span-7">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] text-foreground">
              Have something worth building?
              <br />
              <span className="text-muted-foreground">Let's talk.</span>
            </h3>
            <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
              I'm open to internships, research, and collaboration. The fastest way to reach
              me is email — I read everything.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="group mt-8 inline-flex items-center gap-2.5 h-12 px-6 rounded-sm bg-accent text-accent-foreground text-sm font-semibold transition-[filter,box-shadow] duration-200 hover:brightness-110 hover:shadow-[0_6px_24px_-8px_hsl(33_66%_50%/0.6)]"
            >
              <Mail size={17} aria-hidden="true" />
              Email me
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" aria-hidden="true" />
            </a>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-5 lg:pt-2">
            <div className="border-t border-border">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between gap-4 py-4 border-b border-border transition-colors hover:bg-accent/5 -mx-3 px-3"
                >
                  <span className="label-mono text-muted-foreground">{c.label}</span>
                  <span className="flex items-center gap-2 text-sm text-foreground group-hover:text-accent transition-colors">
                    <span className="font-mono text-[13px] truncate">{c.value}</span>
                    <ArrowUpRight size={15} className="shrink-0 text-muted-foreground group-hover:text-accent transition-colors" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
