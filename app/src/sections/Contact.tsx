import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Mail, Linkedin, Github, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large pulsing orbs */}
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
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
          className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)',
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

        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 right-1/4 w-16 h-16 border border-cyan/10 rounded-lg rotate-12"
          animate={{
            rotate: [12, 102, 12],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-12 h-12 border border-cyan/10 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Animated stars/sparkles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            <Sparkles size={16 + i * 4} />
          </motion.div>
        ))}

        {/* Wave animation at bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full h-24 opacity-[0.03]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z"
            fill="rgba(0, 212, 255, 0.5)"
            animate={{
              d: [
                'M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z',
                'M0,60 C360,0 720,120 1080,60 C1260,30 1350,90 1440,60 L1440,120 L0,120 Z',
                'M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-sm font-medium mb-8"
            whileHover={{
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={16} />
            </motion.div>
            Let's work together
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={16} />
            </motion.div>
          </motion.div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Let's build something{' '}
            <motion.span 
              className="text-gradient inline-block"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              amazing
            </motion.span>{' '}
            together
          </h2>

          {/* Subtext */}
          <p className="text-white/60 text-lg sm:text-xl max-w-xl mx-auto mb-10">
            Have a project in mind? I'd love to hear about it. Let's connect and bring your ideas to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="bg-cyan hover:bg-cyan-dark text-black font-semibold rounded-full px-8 py-6 text-base transition-all duration-300 hover:shadow-glow group"
                asChild
              >
                <a href="mailto:chikwanda.chisha@dartmouth.edu">
                  <Mail size={18} className="mr-2" />
                  Email Me
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send size={18} />
                  </motion.span>
                </a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-cyan/50 text-white rounded-full px-8 py-6 text-base transition-all duration-300"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/chikwanda-chisha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={18} className="mr-2" />
                  LinkedIn
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <motion.a
              href="https://github.com/chikwanda"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-cyan transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Github size={20} />
              <span className="text-sm">GitHub</span>
            </motion.a>
            <span className="text-white/20">|</span>
            <motion.a
              href="https://www.linkedin.com/in/chikwanda-chisha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-cyan transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Linkedin size={20} />
              <span className="text-sm">LinkedIn</span>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
