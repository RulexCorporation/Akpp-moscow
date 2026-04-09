import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRANDS } from "@/constants/branding";
import { Suspense } from "react";
import Template from "./template";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="antialiased">
        <Suspense fallback={<div>Загрузка...</div>}>{children}</Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRepair",
              name: "ATT24",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Югорский проезд, 2с3А",
                addressLocality: "Москва",
                postalCode: "129347",
                addressCountry: "RU",
              },
              telephone: "+79532786493",
              openingHours: "Mo-Su 08:00-21:00",
              image: "https://remont-akkp.ru/logo/logo.png",
              priceRange: "₽₽",
            }),
          }}
        />
      </body>
    </html>
  );
}
