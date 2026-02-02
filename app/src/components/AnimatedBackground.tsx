import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for no transparency on canvas itself if possible, though we need it for layering. Keeping standard context but being mindful.
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseOpacity: number;
      twinklePhase: number;
      twinkleSpeed: number;
    }> = [];

    // Spatial Grid Optimization
    const cellSize = 120; // Size of connection range
    let grid: Map<string, number[]> = new Map();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      // High density: divisor 1000 = ~2000 stars on 1080p
      const starCount = Math.floor(window.innerWidth * window.innerHeight / 3000);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8, // Speed kept as requested
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 1.5 + 0.5,
          baseOpacity: Math.random() * 0.8 + 0.2,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.05 + 0.01,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Reset Grid
      grid.clear();

      // Update positions and populate grid
      stars.forEach((star, i) => {
        star.x += star.vx;
        star.y += star.vy;
        star.twinklePhase += star.twinkleSpeed;

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Add to grid
        const cellX = Math.floor(star.x / cellSize);
        const cellY = Math.floor(star.y / cellSize);
        const key = `${cellX},${cellY}`;

        if (!grid.has(key)) grid.set(key, []);
        grid.get(key)!.push(i);
      });

      // Draw stars and connections
      stars.forEach((star, i) => {
        // Draw Star
        const twinkle = Math.sin(star.twinklePhase) * 0.3;
        const opacity = Math.max(0.1, Math.min(1, star.baseOpacity + twinkle));

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Check connections using Grid
        const cellX = Math.floor(star.x / cellSize);
        const cellY = Math.floor(star.y / cellSize);

        // Check surrounding cells (Including current)
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            const neighborKey = `${cellX + x},${cellY + y}`;
            const neighbors = grid.get(neighborKey);

            if (neighbors) {
              for (const j of neighbors) {
                // Avoid double checking and self-checking
                if (j <= i) continue;

                const other = stars[j];
                const dx = star.x - other.x;
                const dy = star.y - other.y;
                // Simple distance check first (box check) before sqrt
                if (Math.abs(dx) > cellSize || Math.abs(dy) > cellSize) continue;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < cellSize) { // < 120
                  ctx.beginPath();
                  ctx.moveTo(star.x, star.y);
                  ctx.lineTo(other.x, other.y);
                  ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / cellSize)})`;
                  ctx.lineWidth = 0.8;
                  ctx.stroke();
                }
              }
            }
          }
        }

        // Connect to mouse (No grid needed, just check distance)
        const dx = star.x - mouseRef.current.x;
        const dy = star.y - mouseRef.current.y;
        if (Math.abs(dx) < 200 && Math.abs(dy) < 200) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.4 * (1 - distance / 200)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
      createStars();
    });
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    createStars();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#050510]">
      {/* Deep Space Background / Nebulae */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0B1026] via-[#000000] to-[#000000]" />

      {/* Nebula 1 - Purple/Blue */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(76, 29, 149, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Nebula 2 - Cyan/Teal */}
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Canvas for Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            width: '150px',
            top: `${Math.random() * 60}%`, // Mostly upper sky
            left: '-150px',
            transform: 'rotate(0deg)',
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.4)',
          }}
          animate={{
            x: ['0vw', '120vw'],
            y: 0,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 10 + 5, // Random long delays
            repeatDelay: Math.random() * 15 + 5,
          }}
        />
      ))}
    </div>
  );
}
