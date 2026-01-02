'use client';

import { ThemeProvider } from 'next-themes';

/**
 * Providers component wrapping the app with necessary context providers.
 * Currently handles next-themes for Dark/Light mode.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
