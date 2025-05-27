import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Surva.",
  description: "Smart Analysis Application for Survey Result",
  icons: '/surva-32.svg'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased flex flex-col min-h-screen bg-[linear-gradient(180deg,_#ffffff,_#f1f1f1)] text-foreground`}
      >
        
        {children}
      </body>
    </html>
  );
}
