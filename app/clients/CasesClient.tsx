"use client";
import Header from "@/components/Header";
import { BRANDS } from "@/constants/branding";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image"; // Импортируем компонент Image

const cases = [
  {
    car: "Audi A6, 2018 г.в.",
    transmission: "DSG7 (DQ500)",
    issue: "Удары при переключении со 2-й на 3-ю передачу.",
    workDone: "Замена пакета сцепления, ремонт мехатроника, адаптация.",
    cost: "115 000 руб.",
    duration: "3 дня",
    image: "/cases/audi-a6.webp", // Путь к фото в папке public
  },
  {
    car: "BMW X5, 2017 г.в.",
    transmission: "ZF 8HP",
    issue: "Пробуксовки на горячую, переход в аварийный режим.",
    workDone: "Капитальный ремонт гидротрансформатора, замена соленоидов.",
    cost: "140 000 руб.",
    duration: "4 дня",
    image: "/cases/bmw-x5.jpg",
  },
  {
    car: "Mercedes-Benz E300, 2019 г.в.",
    transmission: "9G-TRONIC (725.0)",
    issue: "Рывки при переключении с 1-й на 2-ю, толчки при остановке.",
    workDone: "Замена клапанной плиты, промывка гидроблока, адаптация.",
    cost: "95 000 руб.",
    duration: "2 дня",
    image: "/cases/mercedes-e300.webp",
  },
  {
    car: "Volkswagen Tiguan, 2016 г.в.",
    transmission: "DSG6 (DQ250)",
    issue: "Жужжание при разгоне, задержка при включении D/R.",
    workDone: "Замена первичного вала, подшипников, масляного насоса.",
    cost: "78 000 руб.",
    duration: "3 дня",
    image: "/cases/vw-tiguan.webp",
  },
  {
    car: "Kia Sportage, 2021 г.в.",
    transmission: "A6MF2-2",
    issue: "Пинки при переключении 3→4, запах гари от масла.",
    workDone: "Замена фрикционов, ремонт гидроблока, замена масла с фильтром.",
    cost: "68 000 руб.",
    duration: "2 дня",
    image: "/cases/kia-sportage.webp",
  },
  {
    car: "Nissan Qashqai, 2019 г.в.",
    transmission: "CVT (JF017E)",
    issue: "Вой при разгоне, дергания на малом газу.",
    workDone: "Замена цепи и шкивов, ремонт гидротрансформатора.",
    cost: "88 000 руб.",
    duration: "3 дня",
    image: "/cases/nissan-qashqai.jpeg",
  },
  {
    car: "Hyundai Solaris, 2020 г.в.",
    transmission: "A6GF1",
    issue: "Толчки при переключении с холостого хода в D.",
    workDone: "Замена соленоидов давления, чистка гидроблока, адаптация.",
    cost: "45 000 руб.",
    duration: "1 день",
    image: "/cases/hyundai-solaris.jpg",
  },
  {
    car: "Ford Focus, 2018 г.в.",
    transmission: "PowerShift 6DCT250",
    issue: "Дребезг на 1-й передаче, рывки в пробках.",
    workDone: "Замена вилки выбора передач, программирование модуля TCM.",
    cost: "52 000 руб.",
    duration: "2 дня",
    image: "/cases/ford-focus.webp",
  },
];

export default function CasesClient() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get("brand") as keyof typeof BRANDS;
  const current = BRANDS[brandParam] || BRANDS.ATT24;

  return (
    <main className="bg-white min-h-screen">
      {/* Не забудь добавить Header, если он нужен на этой странице */}

      <div className="container mx-auto px-4 py-20">
        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-4 text-slate-900">
          Наши работы
        </h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-16">
          Техцентр <span className={current.themeColor}>{current.name}</span> —
          возвращаем драйв
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cases.map((item) => (
            <div
              key={item.car}
              className="group bg-white rounded-[40px] overflow-hidden border border-slate-200 flex flex-col hover:border-slate-900 transition-all duration-500 hover:shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)]"
            >
              {/* Блок ФОТО — теперь с реальным Image */}
              <div className="h-72 bg-slate-100 relative overflow-hidden">
                <div
                  className={`absolute top-6 left-6 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-lg z-10 ${current.bgColor}`}
                >
                  {item.transmission}
                </div>

                {/* Реальное изображение с оптимизацией */}
                <Image
                  src={item.image} // Путь к картинке из массива cases
                  alt={`Ремонт АКПП ${item.car}`} // Хороший alt для SEO
                  fill // Заполняет родительский контейнер
                  className="object-cover group-hover:scale-110 transition-transform duration-700" // Сохраняет пропорции и добавляет ховер-эффект
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Помогает браузеру выбрать правильный размер
                  priority={cases.indexOf(item) < 3} // Загружает первые 3 картинки в приоритете
                />

                {/* Легкий градиент поверх фото для читаемости бейджа */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-0" />
              </div>

              <div className="p-10 flex-1 flex flex-col">
                <h3 className="text-3xl font-black mb-8 uppercase italic tracking-tighter text-black leading-none">
                  {item.car}
                </h3>

                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="w-1.5 h-auto bg-red-600 rounded-full shrink-0" />
                    <div>
                      <p className="text-[10px] font-black uppercase text-red-600 tracking-wider mb-1">
                        Проблема
                      </p>
                      <p className="text-base font-bold text-slate-700 leading-snug">
                        {item.issue}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1.5 h-auto bg-green-600 rounded-full shrink-0" />
                    <div>
                      <p className="text-[10px] font-black uppercase text-green-600 tracking-wider mb-1">
                        Решение
                      </p>
                      <p className="text-base font-bold text-slate-700 leading-snug">
                        {item.workDone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-black mb-1">
                      Финальный чек
                    </p>
                    <p
                      className={`text-4xl font-black leading-none tracking-tighter ${current.themeColor}`}
                    >
                      {item.cost}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-black mb-1">
                      Срок
                    </p>
                    <p className="font-black text-black uppercase italic text-lg">
                      {item.duration}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
