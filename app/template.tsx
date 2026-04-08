"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRANDS } from "@/constants/branding";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname(); // Добавляем путь, чтобы менять URL корректно

  const brandId = (searchParams.get("brand") as keyof typeof BRANDS) || "ATT24";
  const currentBrand = BRANDS[brandId] || BRANDS.ATT24;

  const handleToggle = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("brand", id);
    // Используем pathname, чтобы переключение работало и на главной, и на услугах
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Header current={currentBrand} onToggle={handleToggle} />
      {/* Важный момент: если дочерние компоненты (children) 
         внутри себя не используют useSearchParams, они не узнают о смене бренда.
      */}
      <main>{children}</main>
      <Footer brand={currentBrand} />
    </>
  );
}
