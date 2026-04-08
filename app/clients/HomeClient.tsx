"use client";

import { useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import TrustFeatures from "@/components/TrustFeatures";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import ContactForm from "@/components/ContactForm";
import MobileActions from "@/components/MobileActions";
import { BRANDS } from "@/constants/branding";

export default function HomeClient() {
  const searchParams = useSearchParams();

  // Получаем ID из URL. Если его нет, берем ATT24
  const brandId = (searchParams.get("brand") as keyof typeof BRANDS) || "ATT24";

  // Берем данные бренда из конфига. Если ID кривой — фолбэк на ATT24
  const currentBrand = BRANDS[brandId] || BRANDS.ATT24;

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      {/* Header и Footer у нас уже в Template.tsx, 
             поэтому здесь оставляем только контент секций 
          */}
      <main>
        <Hero brand={currentBrand} />
        <TrustFeatures brand={currentBrand} />
        <Services brand={currentBrand} />
        <Calculator brand={currentBrand} />
        <ContactForm brand={currentBrand} />
      </main>
      <MobileActions brand={currentBrand} />
    </div>
  );
}
