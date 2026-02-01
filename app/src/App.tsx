import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';

function App() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Global animated background */}
      <AnimatedBackground />

      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
