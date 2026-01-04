'use client';

import { useRef, useState, useEffect, useLayoutEffect, memo, useCallback } from 'react';
import gsap from 'gsap';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { NAV_ITEMS, CTA_CONFIG } from '@/app/_lib/constants';
import { ANIMATION } from '@/app/_lib/animations';
import ElectricBorderBeam from '@/app/_components/ElectricBorderBeam';
import ThemeToggle from '@/app/_components/ThemeToggle';
import MagneticButton from '@/app/_components/MagneticButton';

/** @typedef {import('@/app/_lib/types').SlidingNavbarProps} SlidingNavbarProps */

const SlidingNavbar = memo(function SlidingNavbar({
  items = NAV_ITEMS,
  defaultActive = 0,
  ctaText = CTA_CONFIG.text,
  ctaHref = CTA_CONFIG.href,
  onNavigate,
  className = '',
}) {
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const itemRefs = useRef([]);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const { theme } = useTheme();

  const isLight = mounted ? theme === 'light' : true;

  const updateIndicator = useCallback((index) => {
    const indicator = indicatorRef.current;
    const item = itemRefs.current[index];
    const nav = navRef.current;

    if (!indicator || !item || !nav) return;

    const itemRect = item.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    gsap.to(indicator, {
      x: itemRect.left - navRect.left,
      width: itemRect.width,
      ...ANIMATION.navIndicator,
    });
  }, []);

  const handleClick = useCallback((index, href) => {
    setActiveIndex(index);
    setIsMenuOpen(false);
    onNavigate?.(index, href);
  }, [onNavigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (mounted) {
      updateIndicator(activeIndex);
    }
  }, [activeIndex, mounted, updateIndicator]);

  useEffect(() => {
    if (!mounted) return;
    const handleResize = () => {
      updateIndicator(activeIndex);
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, mounted, updateIndicator]);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => updateIndicator(activeIndex), 50);
    return () => clearTimeout(timer);
  }, [mounted, activeIndex, updateIndicator]);

  // Scroll listener for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mounted || !mobileMenuRef.current) return;

    const menu = mobileMenuRef.current;
    const links = menu.querySelectorAll('a');

    if (isMenuOpen) {
      gsap.set(menu, { display: 'flex' });
      gsap.to(menu, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' });
      gsap.fromTo(links, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      gsap.to(menu, { 
        opacity: 0, 
        y: -10, 
        duration: 0.2, 
        ease: 'power3.in',
        onComplete: () => gsap.set(menu, { display: 'none' })
      });
    }
  }, [isMenuOpen, mounted]);

  // Hamburger animation
  useEffect(() => {
    if (!mounted || !hamburgerRef.current) return;

    const lines = hamburgerRef.current.querySelectorAll('span');
    if (isMenuOpen) {
      gsap.to(lines[0], { rotate: 45, y: 6, duration: 0.2, ease: 'power3.out' });
      gsap.to(lines[1], { opacity: 0, duration: 0.1 });
      gsap.to(lines[2], { rotate: -45, y: -6, duration: 0.2, ease: 'power3.out' });
    } else {
      gsap.to(lines[0], { rotate: 0, y: 0, duration: 0.2, ease: 'power3.out' });
      gsap.to(lines[1], { opacity: 1, duration: 0.2 });
      gsap.to(lines[2], { rotate: 0, y: 0, duration: 0.2, ease: 'power3.out' });
    }
  }, [isMenuOpen, mounted]);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 transition-all duration-300
        ${isScrolled 
          ? (isLight ? 'bg-light-bg/80 backdrop-blur-md border-b border-light-border' : 'bg-dark-bg/80 backdrop-blur-md border-b border-dark-border')
          : 'bg-transparent border-b border-transparent'
        }
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className={`
            flex items-center gap-3 z-10 transition-colors duration-200
            ${isLight ? 'text-light-text' : 'text-white'}
          `}
        >
          <Image
            src={logo}
            height={40}
            width={40}
            quality={100}
            alt="The K&K Hotel logo"
          />
          <span className="text-xl font-bold font-serif">The K&K Hotel</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ElectricBorderBeam
            duration={6}
            beamLength={150}
            colors={['#2EB9DF', '#9E00FF']}
            borderRadius={9999}
          >
            <div
              ref={navRef}
              className={`
                relative flex items-center gap-1 p-1.5 rounded-full border
                transition-all duration-300
                ${isLight
                  ? 'bg-light-bg border-light-border'
                  : 'bg-dark-surface border-dark-border'
                }
              `}
            >
              <div
                ref={indicatorRef}
                className={`
                  absolute top-1.5 left-0 h-[calc(100%-0.75rem)] rounded-full
                  shadow-sm transition-colors duration-300
                  ${isLight ? 'bg-light-surface' : 'bg-dark-border'}
                `}
              />

              {items.map((item, index) => (
                <Link
                  key={item.label}
                  ref={(el) => (itemRefs.current[index] = el)}
                  href={item.href}
                  onClick={() => handleClick(index, item.href)}
                  className={`
                    relative z-10 px-5 py-2 text-sm font-medium rounded-full
                    transition-colors duration-200 cursor-pointer
                    ${activeIndex === index
                      ? isLight ? 'text-light-text' : 'text-white'
                      : isLight
                        ? 'text-light-muted hover:text-light-text'
                        : 'text-dark-muted hover:text-white'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </ElectricBorderBeam>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <MagneticButton href={ctaHref} isLight={isLight}>
            {ctaText}
          </MagneticButton>
          <ThemeToggle />
        </div>

        {/* Mobile: Theme Toggle & Hamburger */}
        <div className="flex lg:hidden items-center gap-4">
          <ThemeToggle />
          <button
            ref={hamburgerRef}
            onClick={toggleMenu}
            className={`
              flex flex-col justify-center items-center w-10 h-10 gap-1.5
              ${isLight ? 'text-light-text' : 'text-white'}
            `}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 ${isLight ? 'bg-light-text' : 'bg-white'} origin-center`} />
            <span className={`block w-6 h-0.5 ${isLight ? 'bg-light-text' : 'bg-white'}`} />
            <span className={`block w-6 h-0.5 ${isLight ? 'bg-light-text' : 'bg-white'} origin-center`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`
          hidden lg:hidden absolute top-full left-0 right-0 z-50
          flex-col items-center gap-2 py-6 px-6
          border-t transition-colors duration-300
          ${isLight 
            ? 'bg-light-bg border-light-border' 
            : 'bg-dark-bg border-dark-border'
          }
        `}
        style={{ opacity: 0, transform: 'translateY(-10px)' }}
      >
        {items.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => handleClick(index, item.href)}
            className={`
              w-full text-center py-3 text-lg font-medium rounded-lg
              transition-colors duration-200
              ${activeIndex === index
                ? isLight ? 'text-light-text bg-light-surface' : 'text-white bg-dark-surface'
                : isLight
                  ? 'text-light-muted hover:text-light-text hover:bg-light-surface'
                  : 'text-dark-muted hover:text-white hover:bg-dark-surface'
              }
            `}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={ctaHref}
          onClick={() => setIsMenuOpen(false)}
          className={`
            w-full text-center mt-4 px-6 py-3 rounded-full text-sm font-medium
            transition-all duration-300
            ${isLight
              ? 'bg-light-text text-white'
              : 'bg-white text-dark-bg'
            }
          `}
        >
          {ctaText}
        </Link>
      </div>
    </nav>
  );
});

export default SlidingNavbar;
