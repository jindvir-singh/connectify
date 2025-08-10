import { Righteous, Geist_Mono } from "next/font/google";
import "./globals.css";

// Work Sans for main UI text
const rightteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: [ "400"],
});

// Geist Mono for code/monospace usage (optional)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "connectify",
  description: "Connectify - Seamless Communication Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rightteous.variable}}`}>
        {children}
      </body>
    </html>
  );
}
