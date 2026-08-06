import { useEffect } from 'react';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { ProjectDetail } from './sections/ProjectDetail';
import { Background } from './components/Background';
import { useHashRoute } from './hooks/useHashRoute';
import { smoothScrollTo } from './utils/smoothScroll';

function App() {
  const route = useHashRoute();

  // When returning to the home view, finish any scroll that was requested from
  // a detail page (see goToSection) once the sections have mounted.
  useEffect(() => {
    if (route.name !== 'home') return;
    const target = sessionStorage.getItem('pendingScroll');
    if (!target) return;
    sessionStorage.removeItem('pendingScroll');
    requestAnimationFrame(() => smoothScrollTo(target, 800, 72));
  }, [route]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <Background />

      <Navigation />
      <main id="main-content" role="main">
        {route.name === 'project' ? (
          <ProjectDetail slug={route.slug} />
        ) : (
          <>
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
