import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "CULTIVA - Gérez votre exploitation agricole en toute simplicité",
  description: "CULTIVA vous accompagne dans la gestion de vos parcelles, cultures, dépenses, récoltes et activités quotidiennes grâce à une solution simple, moderne et adaptée aux réalités africaines.",
  keywords: ["agriculture", "gestion agricole", "ERP agricole", "CULTIVA", "exploitation agricole", "Afrique"],
  openGraph: {
    title: "CULTIVA - Gérez votre exploitation agricole en toute simplicité",
    description: "Solution moderne de gestion agricole adaptée aux réalités africaines",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "CULTIVA",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web, iOS, Android",
              description: "Plateforme numérique pour aider les agriculteurs à gérer facilement leurs exploitations agricoles",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "XOF",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
