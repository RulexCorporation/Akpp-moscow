"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

export default function Header({ current, onToggle }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const menuLinks = [
    { title: "Услуги", href: `/services?brand=${current.id}` },
    { title: "Работы", href: `/cases?brand=${current.id}` },
    { title: "Калькулятор", href: `/?brand=${current.id}#calculator` },
    { title: "Блог АКПП", href: `/blog?brand=${current.id}` },
    { title: "Контакты", href: `/contacts?brand=${current.id}` },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
      const hideTimer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(hideTimer);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-100 w-full bg-white border-b border-slate-100 shadow-sm">
      <style jsx global>{`
        @keyframes highlight-pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-attention {
          animation: highlight-pulse 0.8s ease-in-out 2;
        }
        body {
          padding-top: 80px;
        }
      `}</style>

      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* ЛЕВАЯ ЧАСТЬ: Лого и Переключатель */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0 ">
          <Link
            href={`/?brand=${current.id}`}
            className={`text-lg sm:text-xl md:text-2xl font-black tracking-tighter shrink-0 ${current.themeColor} truncate`}
          >
            {current.name}
          </Link>

          <div className="relative shrink-0">
            <div
              className={`
                flex bg-slate-100 p-0.5 md:p-1 rounded-xl border border-slate-200 shadow-inner transition-all duration-500
                ${showHint ? "animate-attention ring-4 ring-slate-200/50 scale-105" : "scale-90 md:scale-100"}
              `}
            >
              <button
                onClick={() => onToggle("ATT24")}
                className={`px-1.5 md:px-3 py-1 rounded-lg text-[10px] md:text-[10px] font-black transition-all ${
                  current.id === "ATT24"
                    ? `bg-white ${current.themeColor} shadow-sm`
                    : "text-slate-400"
                }`}
              >
                ATT24
              </button>
              <button
                onClick={() => onToggle("TEST")}
                className={`px-1.5 md:px-3 py-1 rounded-lg text-[10px] md:text-[10px] font-black transition-all ${
                  current.id === "TEST"
                    ? `bg-white ${current.themeColor} shadow-sm`
                    : "text-slate-400"
                }`}
              >
                <span className="hidden xs:inline">TestTransmission</span>
                <span className="xs:hidden uppercase">Test</span>
              </button>
            </div>

            {showHint && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[9px] font-bold px-2 py-1.5 rounded-lg animate-bounce z-70">
                Выбери техцентр ↑
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
              </div>
            )}
          </div>
        </div>

        {/* ЦЕНТР: Десктоп навигация */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 mx-4">
          {menuLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap uppercase tracking-tight"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* ПРАВАЯ ЧАСТЬ: Телефон и Бургер */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Телефон (скрыт на маленьких мобилках, виден от md) */}
          <div className="hidden md:flex flex-col items-end">
            <a
              href={`tel:${current.phoneFull}`}
              className="text-base xl:text-lg font-black text-slate-900 leading-none mb-1 whitespace-nowrap"
            >
              {current.phone}
            </a>
            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">
              Online
            </span>
          </div>

          {/* Иконка трубки для мобилок (вместо текста) */}
          <a
            href={`tel:${current.phoneFull}`}
            className={`md:hidden p-2 rounded-xl text-white ${current.bgColor} shadow-lg`}
          >
            <Phone size={20} fill="currentColor" />
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-900 transition-colors bg-slate-50 rounded-xl hover:bg-slate-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* МОБИЛЬНОЕ МЕНЮ (без изменений логики, только фикс z-index) */}
      <div
        className={`
          lg:hidden fixed inset-x-0 bottom-0 top-20 z-110 bg-white transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="flex flex-col h-full overflow-y-auto p-6">
          <nav className="flex flex-col space-y-1">
            {menuLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-4 border-b border-slate-50 active:bg-slate-50 transition-colors"
              >
                <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
                  {link.title}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6">
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
              <a
                href={`tel:${current.phoneFull}`}
                className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-black text-lg ${current.bgColor} shadow-xl`}
              >
                <Phone size={20} fill="currentColor" />
                {current.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
