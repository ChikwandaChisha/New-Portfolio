import { motion, type Variants } from 'framer-motion';
import { Briefcase, Mail, ChevronDown, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { smoothScrollTo } from '@/utils/smoothScroll';

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">


      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >


        {/* Main Title */}
        <motion.div variants={itemVariants} className="mb-6">
          <p className="text-white/60 text-lg sm:text-xl mb-2">Hello, I'm</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            <span className="sr-only">Chikwanda Chisha</span>
            <span className="inline-block text-gradient-silver">Chikwanda Chisha</span>
          </h1>
        </motion.div>



        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-white/50 text-base sm:text-lg max-w-xl mx-auto mb-10"
        >
          I love to think, code and cook.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              className="bg-cyan hover:bg-cyan-dark text-black font-semibold rounded-full px-8 py-6 text-base transition-all duration-300 hover:shadow-glow"
              onClick={() => smoothScrollTo('#projects', 900, 60)}
            >
              <Briefcase size={18} className="mr-2" />
              View My Work
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
              onClick={() => smoothScrollTo('#contact', 900, 60)}
            >
              <Mail size={18} className="mr-2" />
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
          {[
            { href: 'https://www.linkedin.com/in/chikwanda-chisha', icon: Linkedin },
            { href: 'https://github.com/chikwanda', icon: Github },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-white/60 hover:text-cyan hover:border-cyan/50 transition-colors"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => smoothScrollTo('#about', 900, 60)}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-cyan transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}
