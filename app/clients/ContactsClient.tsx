"use client";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Navigation,
  ExternalLink,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { BRANDS } from "@/constants/branding";

export default function ContactsClient() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get("brand") as keyof typeof BRANDS;
  const brand = BRANDS[brandParam] || BRANDS.ATT24;

  const contactItems = [
    {
      icon: <Phone size={22} />,
      title: "Телефон",
      value: brand.phone,
      link: `tel:${brand.phoneFull}`,
      desc: "Прием звонков 24/7",
    },
    {
      icon: <Send size={22} />,
      title: "Max",
      value: "Написать мастеру",
      link: brand.max || "#",
      desc: "Ответим за 5-20 минут",
    },
    {
      icon: <Send size={22} />,
      title: "Telegram",
      value: "Написать мастеру",
      link: brand.tg || "#",
      desc: "Ответим за 5-20 минут",
    },
    {
      icon: <Clock size={22} />,
      title: "Режим работы",
      value: "08:00 — 21:00",
      link: null,
      desc: "Без выходных и праздников",
    },
  ];

  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 min-h-screen text-slate-900">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="max-w-4xl mb-10 md:mb-16">
          <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 tracking-tighter italic uppercase leading-none">
            Контакты
          </h1>
          <p className="text-slate-500 text-lg md:text-2xl font-medium leading-relaxed">
            Ждем вас в техцентре{" "}
            <span className={`font-black ${brand.themeColor}`}>
              {brand.name}
            </span>
            . Запишитесь заранее, чтобы избежать очереди.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Левая колонка: Инфо-карточки */}
          <div className="lg:col-span-5 space-y-4">
            {contactItems.map((item, i) => (
              <div
                key={i}
                className="p-5 md:p-8 bg-white rounded-3xl md:rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="flex items-center md:items-start gap-4 md:gap-6">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 ${brand.bgColor} text-white shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400 mb-0.5 md:mb-1">
                      {item.title}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-lg md:text-2xl font-black hover:text-slate-600 transition-colors block mb-0.5 md:mb-1 truncate"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg md:text-2xl font-black block mb-0.5 md:mb-1">
                        {item.value}
                      </p>
                    )}
                    <p className="text-xs md:text-sm text-slate-500 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Карточка адреса */}
            <div className="p-6 md:p-8 bg-slate-900 rounded-3xl md:rounded-4xl text-white overflow-hidden relative group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-green-400 mb-3 md:mb-4">
                  <MapPin size={16} />
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">
                    Наш адрес
                  </span>
                </div>
                <h3 className="text-xl md:text-3xl font-black mb-6 leading-tight">
                  {brand.address}
                </h3>
                <div className="flex">
                  <a
                    href={brand.yandex_map_url}
                    target="_blank"
                    className={`flex items-center justify-center gap-2 w-full md:w-auto px-6 py-4 rounded-xl ${brand.bgColor} font-bold text-sm hover:scale-105 transition-transform`}
                  >
                    <Navigation size={18} /> Яндекс Навигатор
                  </a>
                </div>
              </div>
              {/* Декор */}
              <div
                className={`absolute -right-10 -bottom-10 w-40 h-40 ${brand.bgColor} opacity-20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}
              />
            </div>
          </div>

          {/* Правая колонка: Карта */}
          <div className="lg:col-span-7 h-87.5 md:h-125 lg:h-162.5 lg:sticky lg:top-32">
            <div className="w-full h-full bg-slate-200 rounded-3xl md:rounded-[40px] overflow-hidden border-4 md:border-8 border-white shadow-xl relative">
              <iframe
                src={brand.yandex_map_constructor_url}
                width="100%"
                height="100%"
                className="grayscale-[0.2] contrast-[1.1]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
