import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SectionDivider } from './components/SectionDivider';

function App() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Skip to content link for keyboard navigation */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* Global animated background */}
      <AnimatedBackground />

      <Navigation />
      <main id="main-content" className="relative z-10" role="main">
        <Hero />
        <SectionDivider variant="nebula" />
        <About />
        <SectionDivider variant="glow" />
        <Projects />
        <SectionDivider variant="nebula" />
        <Experience />
        <SectionDivider variant="glow" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
