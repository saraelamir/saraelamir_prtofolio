import Background from './components/Background';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Experience from './components/Experience';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Background />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
