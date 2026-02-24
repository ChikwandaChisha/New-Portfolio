import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'default' | 'glow' | 'nebula';
}

export function SectionDivider({ variant = 'default' }: SectionDividerProps) {
  return (
    <div className="relative h-32 sm:h-40 overflow-hidden pointer-events-none z-10">
      {/* Top fade from section above */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-transparent" />

      {/* Central glowing line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
        <motion.div
          className="relative w-full max-w-4xl mx-auto h-px"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1 }}
        >
          {/* Main line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/40 to-transparent blur-sm"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Floating particles around the divider */}
      {variant !== 'default' && (
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan/30"
              style={{
                left: `${15 + i * 18}%`,
                top: '50%',
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.6,
              }}
            />
          ))}
        </div>
      )}

      {/* Nebula variant: soft radial glow */}
      {variant === 'nebula' && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            className="w-64 h-16 rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(0, 212, 255, 0.06) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </div>
  );
}
