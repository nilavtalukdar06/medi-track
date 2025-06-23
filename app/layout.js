import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

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
    <ClerkProvider
      appearance={{ layout: { unsafe_disableDevelopmentModeWarnings: true } }}
    >
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <main>
            {children}
            <Toaster />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
