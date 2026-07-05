import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Background } from './components/Background';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <Background />

      <Navigation />
      <main id="main-content" role="main">
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
