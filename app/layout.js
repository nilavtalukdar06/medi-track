import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "MediTrack - Smart Patient Management System",
  description:
    "MediTrack is a simple and secure app to manage patient records, appointments, and treatments for clinics and hospitals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
