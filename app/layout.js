import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SideBar";
import { Toaster } from "sonner";
import ConditionalSidebar from "@/components/ConditionalSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Go Silly – NFC Card Payments for Events, Clubs & Parties | Tap & Pay Instantly",
  description:
    "Go Silly makes event and club payments fun, fast, and seamless with NFC-enabled cards. Tap to pay for drinks, food, and more—no cash, no hassle. Perfect for festivals, concerts, and nightlife venues.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          {/* <AppSidebar /> */}
          <ConditionalSidebar />
          <main className="w-full">
            {/* <SidebarTrigger /> */}
            {children}
          </main>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
