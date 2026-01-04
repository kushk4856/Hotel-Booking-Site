'use client';

import { useRef, memo } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

const MagneticButton = memo(function MagneticButton({
  href,
  children,
  className = '',
  isLight = true,
}) {
  // We use HTMLAnchorElement because Link renders an <a> tag
  const buttonRef = useRef(null);
  
  // Ref for the text container div
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    const text = textRef.current;
    if (!text) return;

    gsap.to(text.querySelector('.text-top'), {
      y: '-100%',
      duration: 0.3,
      ease: 'power3.out',
    });
    gsap.to(text.querySelector('.text-bottom'), {
      y: '-100%',
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    const text = textRef.current;
    if (!text) return;

    gsap.to(text.querySelector('.text-top'), {
      y: '0%',
      duration: 0.3,
      ease: 'power3.out',
    });
    gsap.to(text.querySelector('.text-bottom'), {
      y: '0%',
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  const handleMouseLeaveButton = () => {
    handleMouseLeave();
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveButton}
      className={`
        relative inline-block px-6 py-2.5 rounded-2xl text-sm font-medium
        overflow-hidden cursor-pointer
        ${isLight ? 'bg-dark-bg text-white' : 'bg-white text-dark-bg'}
        ${className}
      `}
    >
      <div ref={textRef} className="relative h-5 overflow-hidden">
        <span className="text-top block">{children}</span>
        <span className="text-bottom block">{children}</span>
      </div>
    </Link>
  );
});

export default MagneticButton;
