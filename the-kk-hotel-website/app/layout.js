import "./_styles/globals.css";
import Header from "./components/Header";     

export const metadata = {
  title: {
    template: "%$ The K&K Hotel",
    default: "Welcome to the K&K Hotel"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
