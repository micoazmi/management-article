import { Archivo } from "next/font/google";
import "./globals.css";

// Load Archivo font
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap", // optional: improves rendering
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
