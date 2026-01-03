import "./_styles/globals.css";
import Header from "@/app/_components/Header";
import { Providers } from "@/app/_components/Providers";
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
      <body className={`${sans.className} ${serif.variable} ${sans.variable} antialiased bg-light-bg text-light-text dark:bg-primary-950 dark:text-primary-100 min-h-screen flex flex-col transition-colors duration-300`}>
        <Providers>
          <Header />
          <div className="flex-1 px-8 py-12 grid">
            <main className="max-w-7xl mx-auto w-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
