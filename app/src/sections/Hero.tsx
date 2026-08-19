import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Linkedin, Github } from 'lucide-react';
import { smoothScrollTo } from '@/utils/smoothScroll';

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const meta = [
  { label: 'Focus', value: 'SWE · AI · Security' },
  { label: 'Education', value: "Dartmouth College, CS '26" },
  { label: 'Latest', value: 'Arbitra' },
];

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-28 pb-24 sm:pb-20">
      <div className="page-gutter max-w-6xl mx-auto px-5 sm:px-8 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end"
        >
          <div className="lg:col-span-8">
            <motion.p variants={item} className="label-mono text-muted-foreground mb-6 flex items-center gap-2.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Software Engineer · CS @ Dartmouth
            </motion.p>

            <motion.h1
              variants={item}
              className="text-[clamp(2.5rem,11vw,4rem)] leading-[1.02] sm:text-6xl lg:text-7xl font-semibold tracking-tightest text-foreground"
            >
              Chikwanda Chisha
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-muted-foreground"
            >
              I design and build software across AI, security, and systems. I love to play sudoku, code, and cook.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex items-center gap-3">
              <button
                onClick={() => smoothScrollTo('#projects', 800, 72)}
                className="group inline-flex items-center justify-center gap-2 h-10 sm:h-12 px-4 sm:px-6 rounded-sm bg-accent text-accent-foreground text-xs sm:text-sm font-semibold transition-[filter,box-shadow] duration-200 hover:brightness-110 hover:shadow-[0_6px_24px_-8px_hsl(33_66%_50%/0.6)] w-1/2 min-[400px]:w-auto"
              >
                View work
                <ArrowUpRight size={17} className="transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" aria-hidden="true" />
              </button>
              <button
                onClick={() => smoothScrollTo('#contact', 800, 72)}
                className="inline-flex items-center justify-center gap-2 h-10 sm:h-12 px-4 sm:px-6 rounded-sm border border-border text-foreground text-xs sm:text-sm font-medium transition-colors duration-200 hover:border-accent hover:bg-accent/5 w-1/2 min-[400px]:w-auto"
              >
                Get in touch
              </button>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex items-center gap-5">
              {[
                { href: 'https://github.com/ChikwandaChisha', icon: Github, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/chikwanda-chisha', icon: Linkedin, label: 'LinkedIn' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <s.icon size={17} aria-hidden="true" />
                  <span className="label-mono">{s.label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          <motion.dl variants={item} className="lg:col-span-4 lg:pb-2">
            {meta.map((m) => (
              <div key={m.label} className="flex items-baseline justify-between gap-4 py-3 border-t border-border first:border-t-0 lg:first:border-t">
                <dt className="label-mono text-muted-foreground">{m.label}</dt>
                <dd className="text-sm text-foreground text-right">{m.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          smoothScrollTo('#about', 800, 72);
        }}
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to About"
      >
        <span className="label-mono">Scroll</span>
        <ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
