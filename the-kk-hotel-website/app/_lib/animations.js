export const EASING = {
  smooth: 'power3.out',
  snappy: 'power2.out',
  elastic: 'elastic.out(1, 0.5)',
  back: 'back.out(1.7)',
  linear: 'none',
};

export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 1,
};

export const ANIMATION = {
  default: {
    duration: DURATION.normal,
    ease: EASING.smooth,
  },
  quick: {
    duration: DURATION.fast,
    ease: EASING.snappy,
  },
  reveal: {
    duration: DURATION.slow,
    ease: EASING.smooth,
  },
  navIndicator: {
    duration: DURATION.normal,
    ease: EASING.smooth,
  },
  heroText: {
    duration: DURATION.slow,
    ease: EASING.smooth,
    stagger: 0.1,
  },
  cardHover: {
    duration: DURATION.fast,
    ease: EASING.snappy,
    scale: 1.02,
  },
  pageTransition: {
    duration: DURATION.normal,
    ease: EASING.smooth,
  },
};

export const SCROLL_TRIGGER = {
  fadeIn: {
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play none none reverse',
  },
  pin: {
    start: 'top top',
    end: '+=500',
    pin: true,
    scrub: 1,
  },
  parallax: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
};

export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  fromCenter: {
    amount: 0.3,
    from: 'center',
  },
  random: {
    amount: 0.5,
    from: 'random',
  },
};
