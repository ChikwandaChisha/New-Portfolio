import { useInView, motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden section-fade">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full border border-cyan/10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 rounded-lg border border-cyan/10 rotate-45"
          animate={{
            y: [0, 20, 0],
            rotate: [45, 225, 405],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-10 h-10 border border-cyan/10"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 90, 180],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-14 h-14 rounded-lg border border-cyan/5 rotate-12"
          animate={{
            y: [0, 30, 0],
            rotate: [12, -45, 12],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-cyan text-sm font-medium uppercase tracking-widest mb-4">
            Get To Know More
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">About Me</h2>
        </ScrollReveal>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <ScrollReveal delay={0.1}>
            <div className="relative">
              <motion.div
                className="aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-border"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/profile-new.jpg"
                  alt="Chikwanda Chisha"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Animated decorative elements */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-cyan/10 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-cyan/5 blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <div className="space-y-8">
            {/* Stats Cards */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="p-6 rounded-2xl border border-border bg-card/50 hover:border-cyan/30 transition-colors"
                  whileHover={{ y: -5, borderColor: 'rgba(0, 212, 255, 0.4)' }}
                >
                  <Briefcase className="w-8 h-8 text-cyan mb-4" />
                  <div className="text-3xl font-bold text-white mb-1">
                    <CountUp end={3} />+
                  </div>
                  <p className="text-white/60 text-sm">Years Experience</p>
                  <p className="text-white/40 text-xs mt-1">Research & Industry</p>
                </motion.div>
                <motion.div
                  className="p-6 rounded-2xl border border-border bg-card/50 hover:border-cyan/30 transition-colors"
                  whileHover={{ y: -5, borderColor: 'rgba(0, 212, 255, 0.4)' }}
                >
                  <GraduationCap className="w-8 h-8 text-cyan mb-4" />
                  <div className="text-lg font-bold text-white mb-1">Dartmouth College</div>
                  <p className="text-white/60 text-sm">BA, Computer Science</p>
                  <p className="text-white/40 text-xs mt-1">2022 - 2026</p>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal delay={0.3}>
              <div className="space-y-6 text-white/70 leading-relaxed">


                <div>
                  <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider text-cyan">Awards & Honors</h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan" />Dartmouth Honor List</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan" />EE Just STEM Fellow</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan" />$13k EE Just Research Fund</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan" />First Quantum Mine (FQM) Scholarship</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider text-cyan">Relevant Coursework</h4>
                  <p className="text-sm leading-relaxed">
                    Machine Learning, NLP, Software Design, Game Theory, Privacy & Cyber Security, Data Structures & Algorithms, Distributed Systems.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
