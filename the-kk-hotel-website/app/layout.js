import "./_styles/globals.css";
import Header from "@/app/_components/Header";
import { Providers } from "@/app/_components/Providers";
import MagneticCursor from "@/app/_components/MagneticCursor";
import { Source_Serif_4, Jost } from "next/font/google";

const serif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  title: {
    template: "%s | The K&K Hotel",
    default: "Welcome | The K&K Hotel",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.className} ${serif.variable} ${sans.variable} antialiased bg-light-bg text-light-text dark:bg-dark-bg dark:text-white min-h-screen flex flex-col transition-colors duration-300`}>
        <Providers>
          <MagneticCursor />
          <Header />
          <div className="flex-1 grid">
            <main className="w-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
