'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-border-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-accent-gradient flex items-center justify-center">
              <span className="text-white text-xs font-bold">IS</span>
            </div>
            <span className="font-heading text-xl font-normal text-primary-dark tracking-wide group-hover:text-accent transition-colors">
              INSKIN<span className="text-accent">.</span>CLINIC
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-text-muted hover:text-primary-dark transition-colors"
            >
              Главная
            </Link>
            <Link
              href="/services"
              className="text-sm text-text-muted hover:text-primary-dark transition-colors"
            >
              Услуги
            </Link>
            <Link
              href="/#about"
              className="text-sm text-text-muted hover:text-primary-dark transition-colors"
            >
              О клинике
            </Link>
            <Link
              href="/#contacts"
              className="text-sm text-text-muted hover:text-primary-dark transition-colors"
            >
              Контакты
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+78129055112"
              className="text-sm text-text-muted hover:text-accent transition-colors"
            >
              +7 (812) 905-51-12
            </a>
            <Link href="/booking" className="btn-primary text-sm py-2.5 px-6">
              Записаться
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Меню"
          >
            <span
              className={`block h-0.5 w-6 bg-primary-dark transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-primary-dark transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-primary-dark transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-border-soft px-4 py-6 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-base text-primary-dark hover:text-accent transition-colors py-1"
          >
            Главная
          </Link>
          <Link
            href="/services"
            onClick={() => setMenuOpen(false)}
            className="text-base text-primary-dark hover:text-accent transition-colors py-1"
          >
            Услуги
          </Link>
          <Link
            href="/#about"
            onClick={() => setMenuOpen(false)}
            className="text-base text-primary-dark hover:text-accent transition-colors py-1"
          >
            О клинике
          </Link>
          <Link
            href="/#contacts"
            onClick={() => setMenuOpen(false)}
            className="text-base text-primary-dark hover:text-accent transition-colors py-1"
          >
            Контакты
          </Link>
          <div className="pt-2 border-t border-border-soft">
            <a
              href="tel:+78129055112"
              className="block text-accent font-medium mb-3"
            >
              +7 (812) 905-51-12
            </a>
            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full text-center"
            >
              Записаться
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
