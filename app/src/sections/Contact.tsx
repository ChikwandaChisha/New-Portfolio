import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden section-fade">


      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center">


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
                className="border-border hover:border-cyan hover:bg-cyan/20 text-white hover:text-cyan rounded-full px-8 py-6 text-base transition-all duration-300 hover:shadow-glow"
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
