import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALAN ENG | Engenharia Florestal de Precisão",
  description: "Engenharia de precisão para ecossistemas sustentáveis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Newsreader:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased bg-background text-on-background selection:bg-primary selection:text-on-primary"
      >
        {children}
      </body>
    </html>
  );
}
