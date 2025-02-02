import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import CreateEventDrawer from "@/components/create-event";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SAwJR",
  icons: "/favicon.png",
  description: "Made By Janmejay Sahu",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
            {children}
          </main>
          <footer className="bg-purple-300 py-5">
            <div className="container mx-auto px-4 text-center text-black-600">
              <p>Made by SAwJR</p>
            </div>
          </footer>
          <CreateEventDrawer />
        </body>
      </html>
    </ClerkProvider>
  );
}
