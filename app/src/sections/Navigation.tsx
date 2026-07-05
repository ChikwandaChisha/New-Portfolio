import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { smoothScrollTo } from '@/utils/smoothScroll';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { name: 'About', href: '#about', index: '01' },
  { name: 'Projects', href: '#projects', index: '02' },
  { name: 'Experience', href: '#experience', index: '03' },
  { name: 'Contact', href: '#contact', index: '04' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href, 800, 72);
    setIsMobileMenuOpen(false);
  }, []);

  const scrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main navigation"
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-background/85 backdrop-blur-md border-b border-border'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a
            href="#"
            onClick={scrollTop}
            className="group flex items-center gap-2.5 text-foreground"
            aria-label="Back to top"
          >
            <span className="flex h-7 w-7 items-center justify-center border border-border text-[11px] font-mono font-medium text-accent transition-colors group-hover:border-accent">
              CC
            </span>
            <span className="text-sm font-medium tracking-tight hidden sm:inline">
              Chikwanda Chisha
            </span>
          </a>

          <div className="flex items-center gap-3 md:gap-6">
            <nav className="hidden md:flex items-center gap-8" aria-label="Sections">
              {navLinks.map((link) => {
                const active = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={active ? 'true' : undefined}
                    className={`group flex items-center gap-1.5 label-mono transition-colors ${
                      active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className={active ? 'text-accent' : 'text-muted-foreground/60'}>
                      {link.index}
                    </span>
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </nav>

            <ThemeToggle />

            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {isMobileMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Navigation menu"
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col justify-center h-full px-8 gap-1"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-baseline gap-4 py-3 border-b border-border text-foreground hover:text-accent transition-colors"
                >
                  <span className="label-mono text-muted-foreground/70">{link.index}</span>
                  <span className="text-3xl font-medium tracking-tight">{link.name}</span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
