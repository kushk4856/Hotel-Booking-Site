'use client';

import { useRef, useEffect, useState, memo } from 'react';
import gsap from 'gsap';

const MagneticCursor = memo(function MagneticCursor() {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const onMouseEnterMagnetic = (e) => {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      
      gsap.to(cursor, {
        scale: 2.5,
        duration: 0.3,
        ease: 'power3.out',
      });

      const onMove = (e) => {
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(target, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: 'power3.out',
        });
      };

      target.addEventListener('mousemove', onMove);
      target._onMove = onMove;
    };

    const onMouseLeaveMagnetic = (e) => {
      const target = e.currentTarget;
      
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power3.out',
      });

      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });

      if (target._onMove) {
        target.removeEventListener('mousemove', target._onMove);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const magneticElements = document.querySelectorAll('[data-magnetic]');
    magneticElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterMagnetic);
      el.addEventListener('mouseleave', onMouseLeaveMagnetic);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      magneticElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterMagnetic);
        el.removeEventListener('mouseleave', onMouseLeaveMagnetic);
      });
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className={`
        fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999]
        border border-accent-400 mix-blend-difference
        -translate-x-1/2 -translate-y-1/2
        transition-opacity duration-300
        hidden lg:block
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    />
  );
});

export default MagneticCursor;
