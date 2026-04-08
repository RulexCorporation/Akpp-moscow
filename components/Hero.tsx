"use client";
import { Phone, Navigation, Star, ExternalLink } from "lucide-react";
import Image from "next/image"; // Импортируем компонент Image

export default function Hero({ brand }: any) {
  // Проверка на наличие бренда, чтобы избежать ошибок при рендеринге
  if (!brand) return null;
  const steps = [
    {
      title: "Диагностика",
      desc: "Компьютерное сканирование и тест-драйв с мастером. Определяем ликвидность ремонта.",
      icon: "01",
    },
    {
      title: "Дефектовка",
      desc: "Разбор трансмиссии в вашем присутствии. Составление точной сметы запчастей.",
      icon: "02",
    },
    {
      title: "Ремонт",
      desc: "Замена изношенных узлов, промывка гидроблока и замена расходников.",
      icon: "03",
    },
    {
      title: "Тестирование",
      desc: "Выходная диагностика и адаптация коробки под ваш стиль вождения.",
      icon: "04",
    },
  ];
  return (
    <section className="relative bg-white text-slate-900 overflow-hidden border-b border-slate-100">
      {/* Динамический фон */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] ${
          brand.id === "ATT24" ? "from-red-50/60" : "from-blue-50/60"
        } via-white to-white z-0`}
      />

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-[1fr,380px] items-center gap-12 xl:gap-20">
          <div className="flex flex-col">
            <div
              className={`inline-flex items-center gap-2 ${brand.lightBg} ${brand.themeColor} px-4 py-2 rounded-full mb-8 font-bold tracking-wide text-xs uppercase w-fit`}
            >
              <Navigation size={14} className="animate-pulse" />
              <span>{brand.address}</span>
            </div>

            {/* Заголовок и Логотип. Логотип скрыт на мобильных (hidden), виден от md (md:block) */}
            <div className="flex items-center gap-8 mb-8">
              <h1 className="text-4xl md:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight grow">
                Ремонт АКПП <br />
                <span className={brand.themeColor}>без посредников</span>
              </h1>

              {/* Логотип как большая картинка. Скрываем на телефоне. */}
              {brand.logo_url && (
                <div className="hidden md:block shrink-0">
                  <Image
                    src={brand.logo_url}
                    alt={`Логотип ${brand.name}`}
                    // Задаем большие "максимальные" размеры для оптимизации Next.js
                    width={600}
                    height={300}
                    // Управляем реальным размером через CSS: h-24 на md, h-32 на xl. w-auto сохраняет пропорции.
                    className=" h-24 xl:h-32 object-contain"
                    priority // Приоритетная загрузка
                  />
                </div>
              )}
            </div>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              Специализированный техцентр {brand.name}. Честная дефектовка в
              вашем присутствии, запчасти в наличии и эвакуатор за наш счет.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href={`tel:${brand.phoneFull}`}
                className={`flex items-center justify-center gap-3 ${brand.bgColor} hover:brightness-110 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl ${brand.shadow} active:scale-95`}
              >
                <Phone size={22} /> Позвонить мастеру
              </a>
            </div>
          </div>

          {/* Правая колонка с динамической ссылкой на отзывы */}
          <div className="flex flex-col gap-5 p-2 bg-slate-100/50 rounded-[40px] border border-slate-200/60">
            <a
              href={brand.yandex_reviews_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-8 rounded-[36px] shadow-sm border border-slate-100 transition-all hover:shadow-md active:scale-[0.98]"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-slate-900">
                  {brand.rate}
                </span>
                <div
                  className={`${brand.bgColor} text-white p-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110`}
                >
                  <Star size={32} fill="currentColor" />
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-slate-900">Яндекс.Карты</p>
                <div
                  className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${brand.themeColor}`}
                >
                  <span>Читать отзывы</span>
                  <ExternalLink
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </a>
          </div>
          <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-12">
                Как мы работаем
              </h2>
              <div className="grid md:grid-cols-4 gap-8">
                {steps.map((step) => (
                  <div
                    key={step.title}
                    className="relative p-8 bg-white rounded-3xl border border-slate-100 shadow-sm"
                  >
                    <span
                      className={`text-5xl font-black opacity-10 absolute top-4 right-6 ${brand.themeColor}`}
                    >
                      {step.icon}
                    </span>
                    <h3 className="text-xl font-bold mb-3 uppercase">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
