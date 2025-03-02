import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Nav from "@/components/Property/Nav";
import { RoomDetailProvider } from "@/context/RoomDetailContext";
import { SearchFormProvider } from "@/context/SearchContext";
import TopLoadingBar from "@/components/TopLoadingBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BOOK BANI",
  description: "Book hotel with me",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <TopLoadingBar/>
        <SearchFormProvider>
          <RoomDetailProvider>
          <Nav/>
          {children}
          <Toaster/>
          </RoomDetailProvider>
        </SearchFormProvider>
      </body>
    </html>
  );
}
