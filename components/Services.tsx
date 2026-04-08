"use client";
import {
  ChevronRight,
  Wrench,
  Droplets,
  Activity,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Services({ brand }: any) {
  const isATT = brand.id === "ATT24";

  const mockServices = [
    {
      title: "Ремонт АКПП",
      price: "от 15 000 ₽",
      desc: "Полный цикл восстановления с гарантией до 2-х лет.",
      icon: <Wrench size={24} />,
    },
    {
      title: "Замена масла",
      price: "от 3 500 ₽",
      desc: "Аппаратная или частичная замена с адаптацией.",
      icon: <Droplets size={24} />,
    },
    {
      title: "Диагностика",
      price: "0 ₽",
      desc: "Бесплатная компьютерная дефектовка при ремонте.",
      icon: <Activity size={24} />,
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Наши услуги
            </h2>
            <p className="text-slate-500 font-medium max-w-lg">
              {`Профессиональное обслуживание трансмиссий в техцентре ${brand.name} с использованием оригинальных запчастей.`}
            </p>
          </div>
          <div
            className={`hidden md:block h-1 w-24 rounded-full ${brand.bgColor} opacity-20`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mockServices.map((s, i) => (
            <div
              key={i}
              className="group bg-white p-8 rounded-[40px] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 border border-slate-100 flex flex-col"
            >
              <div
                className={`p-5 rounded-2xl w-fit mb-8 transition-all duration-500 ${
                  isATT
                    ? "bg-red-50 text-red-600 group-hover:bg-red-600"
                    : "bg-blue-50 text-blue-600 group-hover:bg-blue-600"
                } group-hover:text-white group-hover:rotate-6 group-hover:scale-110`}
              >
                {s.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 transition-colors group-hover:text-slate-800">
                {s.title}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-8 grow">
                {s.desc}
              </p>

              <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                <div>
                  <span className="block text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1">
                    Стоимость
                  </span>
                  <span className={`text-2xl font-black ${brand.themeColor}`}>
                    {s.price}
                  </span>
                </div>

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 text-white shadow-lg ${
                    brand.bgColor
                  } ${brand.hoverBg} ${brand.shadow} group-hover:translate-x-1 active:scale-90`}
                >
                  <ChevronRight size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* КНОПКА «ВСЕ УСЛУГИ» */}
        <div className="flex justify-center">
          <Link
            href={`/services?brand=${brand.id}`}
            className={`group flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all border-2 border-slate-200 text-slate-600 hover:text-white ${brand.id === "ATT24" ? "hover:bg-red-600 hover:border-red-600" : "hover:bg-blue-600 hover:border-blue-600"} active:scale-95 shadow-sm`}
          >
            Смотреть все услуги
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
