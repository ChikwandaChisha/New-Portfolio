import { motion, type Variants } from 'framer-motion';
import { Sparkles, Calendar, Mail, ChevronDown, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      {/* Animated concentric circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-cyan/10"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Rotating gradient ring */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(0, 212, 255, 0.3), transparent, rgba(0, 212, 255, 0.3), transparent)',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Pulsing glow behind title */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
        }}
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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-sm font-medium"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(0, 212, 255, 0)',
                '0 0 20px 5px rgba(0, 212, 255, 0.2)',
                '0 0 0 0 rgba(0, 212, 255, 0)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles size={16} />
            Available for opportunities
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          </motion.span>
        </motion.div>

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
          Passionate about harnessing technology to tackle real-world challenges
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
              onClick={() => window.open('https://calendly.com/chikwanda-chisha-26/30min', '_blank')}
            >
              <Calendar size={18} className="mr-2" />
              Schedule a Call
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
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
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
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
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
