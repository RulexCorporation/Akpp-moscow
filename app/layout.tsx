import "./globals.css";
import { Suspense } from "react";
import Script from "next/script"; // Импортируем компонент для скриптов

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        {/* Яндекс.Метрика: вставляем через dangerouslySetInnerHTML */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=108466083", "ym");

              ym(108466083, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
              });
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108466083"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body className="antialiased">
        <Suspense fallback={<div>Загрузка...</div>}>{children}</Suspense>

        {/* Твой существующий JSON-LD */}
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
