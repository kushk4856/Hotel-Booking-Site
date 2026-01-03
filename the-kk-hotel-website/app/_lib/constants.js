export const SITE_CONFIG = {
  name: 'The K&K Hotel',
  tagline: 'Luxury in the heart of the Dolomites',
  description: 'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests',
};

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Cabins', href: '/cabins' },
  { label: 'Guest Area', href: '/account' },
];

export const CTA_CONFIG = {
  text: 'Book Now',
  href: '/cabins',
};

export const ROUTES = {
  home: '/',
  about: '/about',
  cabins: '/cabins',
  cabin: (id) => `/cabins/${id}`,
  account: '/account',
  reservations: '/account/reservations',
  profile: '/account/profile',
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
