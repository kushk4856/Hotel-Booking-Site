'use client';

import { useRef, useLayoutEffect, useState, memo, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const ElectricBorderBeam = memo(function ElectricBorderBeam({
  children,
  duration = 5,
  beamLength = 100,
  colors = ['#2EB9DF', '#9E00FF'],
  borderRadius = 9999,
  strokeWidth = 2,
  className = '',
}) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const gradientRef = useRef(null);
  const [pathInfo, setPathInfo] = useState({ d: '', length: 0, width: 0, height: 0, radius: 0 });
  const gradientId = useRef(`beam-${Math.random().toString(36).slice(2, 9)}`);

  const getPointOnPath = useCallback((distance, width, height, radius) => {
    const r = Math.min(radius, Math.min(width, height) / 2);
    const top = width - 2 * r;
    const right = height - 2 * r;
    const corner = (Math.PI * r) / 2;
    const perimeter = 2 * (top + right) + 4 * corner;
    let d = ((distance % perimeter) + perimeter) % perimeter;

    const segments = [
      top,
      top + corner,
      top + corner + right,
      top + 2 * corner + right,
      2 * top + 2 * corner + right,
      2 * top + 3 * corner + right,
      2 * top + 3 * corner + 2 * right,
    ];

    if (d <= segments[0]) {
      return { x: r + d, y: 0 };
    } else if (d <= segments[1]) {
      const angle = (d - segments[0]) / r;
      return { x: width - r + r * Math.sin(angle), y: r - r * Math.cos(angle) };
    } else if (d <= segments[2]) {
      return { x: width, y: r + (d - segments[1]) };
    } else if (d <= segments[3]) {
      const angle = (d - segments[2]) / r;
      return { x: width - r + r * Math.cos(angle), y: height - r + r * Math.sin(angle) };
    } else if (d <= segments[4]) {
      return { x: width - r - (d - segments[3]), y: height };
    } else if (d <= segments[5]) {
      const angle = (d - segments[4]) / r;
      return { x: r - r * Math.sin(angle), y: height - r + r * Math.cos(angle) };
    } else if (d <= segments[6]) {
      return { x: 0, y: height - r - (d - segments[5]) };
    } else {
      const angle = (d - segments[6]) / r;
      return { x: r - r * Math.cos(angle), y: r - r * Math.sin(angle) };
    }
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updatePath = () => {
      const { width: w, height: h } = container.getBoundingClientRect();
      if (w === 0 || h === 0) return;

      const r = Math.min(borderRadius, Math.min(w, h) / 2);
      const d = `M ${r} 0 L ${w - r} 0 Q ${w} 0 ${w} ${r} L ${w} ${h - r} Q ${w} ${h} ${w - r} ${h} L ${r} ${h} Q 0 ${h} 0 ${h - r} L 0 ${r} Q 0 0 ${r} 0 Z`;
      const length = 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;

      setPathInfo({ d, length, width: w, height: h, radius: r });
    };

    requestAnimationFrame(updatePath);
    const observer = new ResizeObserver(updatePath);
    observer.observe(container);

    return () => observer.disconnect();
  }, [borderRadius]);

  useGSAP(() => {
    const path = pathRef.current;
    const gradient = gradientRef.current;
    if (!path || !gradient || pathInfo.length === 0) return;

    const { length, width, height, radius } = pathInfo;
    const gap = length - beamLength;

    gsap.set(path, { strokeDasharray: `${beamLength} ${gap}`, strokeDashoffset: 0 });

    const progress = { value: 0 };
    gsap.to(progress, {
      value: 1,
      duration,
      ease: 'none',
      repeat: -1,
      onUpdate: () => {
        const currentPos = progress.value * length;
        path.style.strokeDashoffset = -currentPos;

        const head = getPointOnPath(currentPos + beamLength, width, height, radius);
        const tail = getPointOnPath(currentPos, width, height, radius);

        gradient.setAttribute('x1', tail.x.toFixed(2));
        gradient.setAttribute('y1', tail.y.toFixed(2));
        gradient.setAttribute('x2', head.x.toFixed(2));
        gradient.setAttribute('y2', head.y.toFixed(2));
      },
    });
  }, { dependencies: [pathInfo, beamLength, duration], scope: containerRef });

  const { width, height, d } = pathInfo;
  const isReady = width > 0 && height > 0 && d;

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`} style={{ isolation: 'isolate' }}>
      {children}
      {isReady && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ zIndex: 50, overflow: 'visible' }}
        >
          <defs>
            <linearGradient ref={gradientRef} id={gradientId.current} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={colors[1]} stopOpacity="0" />
              <stop offset="60%" stopColor={colors[1]} stopOpacity="0.5" />
              <stop offset="85%" stopColor={colors[0]} stopOpacity="1" />
              <stop offset="100%" stopColor={colors[0]} stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d={d}
            fill="none"
            stroke={`url(#${gradientId.current})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
});

export default ElectricBorderBeam;
