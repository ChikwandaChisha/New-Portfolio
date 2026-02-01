import { motion } from 'framer-motion';

interface SectionBackgroundProps {
  variant?: 'default' | 'gradient' | 'dots';
}

export function SectionBackground({ variant = 'default' }: SectionBackgroundProps) {
  if (variant === 'gradient') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient mesh */}
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.08) 0%, transparent 50%)',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.05) 0%, transparent 50%)',
          }}
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated dots pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan"
              style={{
                left: `${(i % 10) * 10 + 5}%`,
                top: `${Math.floor(i / 10) * 20 + 10}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle wave animation */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 opacity-[0.03]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill="rgba(0, 212, 255, 0.5)"
          animate={{
            d: [
              'M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z',
              'M0,60 C240,0 480,120 720,60 C960,0 1200,120 1440,60 L1440,120 L0,120 Z',
              'M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
}
