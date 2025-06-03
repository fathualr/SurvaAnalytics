import { Montserrat } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased flex flex-col min-h-screen bg-accent-1 text-foreground`} >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
};
