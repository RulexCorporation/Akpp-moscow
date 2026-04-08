"use client";
import { useState } from "react";
import { Phone, X } from "lucide-react";
import Image from "next/image";
import { BRANDS } from "@/constants/branding";

export default function MobileActions({ brand }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      name: "Telegram",
      icon: "/icons/telegram.svg",
      href: `${brand.tg}`,
      color: "bg-transparent",
    },
    {
      name: "WhatsApp",
      icon: "/icons/max.svg",
      href: `${brand.max}`,
      color: "bg-transparent",
    }, // Допустим max - это черный бренд
    {
      name: "Call",
      icon: null,
      href: `tel:${brand.phoneFull}`,
      color: "bg-red-600",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-100 md:hidden flex flex-col items-end">
      <div
        className={`flex flex-col gap-4 mb-4 transition-all duration-300 ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-10 pointer-events-none"}`}
      >
        {actions.map((a) => (
          <a
            key={a.name}
            target="_blank"
            href={a.href}
            className={`${a.color} text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center`}
          >
            {a.icon ? (
              <Image
                src={a.icon}
                alt={a.name}
                width={44}
                height={44}
                className="rounded-4xl"
              />
            ) : (
              <Phone size={24} fill="currentColor" />
            )}
          </a>
        ))}
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? "bg-slate-800" : brand.bgColor} text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all animate-bounce-slow`}
      >
        {isOpen ? <X size={32} /> : <Phone size={30} />}
      </button>
    </div>
  );
}
