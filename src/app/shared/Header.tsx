"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fr-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container">
          <div className="brand">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); closeMobileMenu(); }}>
              <Image className="brand-logo" src="/logo-horizontal.png" alt="FreshRoom — клининговая компания в Москве" width={240} height={56} priority />
            </a>
          </div>
          
          {/* Десктопная навигация */}
          <nav className="desktop-nav">
            <a href="#services" onClick={closeMobileMenu}>Услуги</a>
            <a href="#prices" onClick={closeMobileMenu}>Калькулятор</a>
            <a href="#reviews" onClick={closeMobileMenu}>Отзывы</a>
            <a href="https://t.me/freshroom_cleaning" target="_blank" rel="noopener" className="header-action header-tg" title="Telegram">
              <span className="icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21.7 3.3c.4.3.5.9.1 1.3l-3.7 15.6c-.2.7-.9 1-1.5.7-.4-.2-.8-.5-1.2-.8l-3.4-2.6-2.2 2.2c-.3.3-.8.3-1.1 0l1-3.8L4.2 12c-.6-.3-.5-1.2.2-1.4L20.8 3c.3-.1.7 0 .9.3zM9.7 14.4l1.6 1.2 5.2-6.8-6.8 5 .1.6z"/>
                </svg>
              </span>
              <span className="sr-only">Telegram</span>
            </a>
            <a href="tel:+79932586621" className="header-action header-phone" title="Позвонить">
              <span className="icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21 16.5v3a2 2 0 0 1-2.2 2c-10.6-.9-15.3-5.6-16.2-16.2A2 2 0 0 1 4.6 3h3a1 1 0 0 1 1 0.84l.6 3.5a1 1 0 0 1-.29.9l-2 2a12 12 0 0 0 6.1 6.1l2-2a1 1 0 0 1 .9-.29l3.5.6A1 1 0 0 1 21 16.5z"/>
                </svg>
              </span>
              <span className="phone-text">+79932586621</span>
            </a>
            <a href="#contact" className="btn-primary header-cta" onClick={closeMobileMenu}>
              <span className="btn-icon">🚀</span>
              Заказать уборку
            </a>
          </nav>

          {/* Мобильная кнопка меню */}
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Открыть меню"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Мобильное меню */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <nav className="mobile-nav">
              <a href="#services" onClick={closeMobileMenu}>
                <span className="nav-icon">🏠</span>
                Услуги
              </a>
              <a href="#prices" onClick={closeMobileMenu}>
                <span className="nav-icon">💰</span>
                Калькулятор
              </a>
              <a href="#reviews" onClick={closeMobileMenu}>
                <span className="nav-icon">⭐</span>
                Отзывы
              </a>
              <a href="#faq" onClick={closeMobileMenu}>
                <span className="nav-icon">❓</span>
                Вопросы
              </a>
            </nav>
            
            <div className="mobile-actions">
              <a href="https://t.me/freshroom_cleaning" target="_blank" rel="noopener" className="mobile-action-btn mobile-tg">
                <span className="btn-icon">✈️</span>
                Telegram
              </a>
              <a href="tel:+79932586621" className="mobile-action-btn mobile-phone">
                <span className="btn-icon">📞</span>
                +79932586621
              </a>
              <a href="#contact" className="mobile-action-btn mobile-cta" onClick={closeMobileMenu}>
                <span className="btn-icon">🚀</span>
                Заказать уборку
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
