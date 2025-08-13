import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { Red_Hat_Text } from "next/font/google";
import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";

const red = Red_Hat_Text({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anime Tracker",
  description: "Track your favorite anime with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${red.className} antialiased`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <HeroHeader />
            {children}
            <FooterSection />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
