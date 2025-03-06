import { useState, useEffect } from 'react';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { ThreeDCardSliderDemo } from './ThreeDCardSliderDemo';

const ThreeDCardDemo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const triggerFooterContact = () => {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: 'smooth',
      });

      setTimeout(() => {
        const footerContactBtn = document.querySelector('[data-footer-contact]') as HTMLButtonElement;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        triggerFooterContact={triggerFooterContact}
      />
      <main>
        <ThreeDCardSliderDemo />
      </main>
      <Footer />
    </div>
  );
};

export default ThreeDCardDemo;