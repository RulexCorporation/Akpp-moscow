"use client";
import { useState } from "react";
import {
  Wrench,
  Droplets,
  Activity,
  Gauge,
  Disc,
  Shield,
  Settings,
  Cpu,
  Layers,
  Cog,
  X,
  User,
  Phone,
  CheckCircle,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { BRANDS } from "@/constants/branding";

const ALL_SERVICES = [
  {
    title: "Ремонт АКПП (Классика)",
    price: "от 15 000 ₽",
    category: "Ремонт",
    icon: <Wrench size={24} />,
  },
  {
    title: "Ремонт DSG (6/7)",
    price: "от 15 000 ₽",
    category: "DSG/S-Tronic",
    icon: <Layers size={24} />,
  },
  {
    title: "Ремонт PowerShift",
    price: "от 18 000 ₽",
    category: "Роботизированные",
    icon: <Settings size={24} />,
  },
  {
    title: "Ремонт Мехатроника",
    price: "от 10 000 ₽",
    category: "Электроника",
    icon: <Cpu size={24} />,
  },
  {
    title: "Ремонт Гидроблока",
    price: "от 20 000 ₽",
    category: "Гидравлика",
    icon: <Gauge size={24} />,
  },
  {
    title: "Ремонт Гидротрансформатора",
    price: "от 15 000 ₽",
    category: "Ремонт",
    icon: <Cog size={24} />,
  },
  {
    title: "Снятие / Установка АКПП",
    price: "от 10 000 ₽",
    category: "Монтаж",
    icon: <Wrench size={24} />,
  },
  {
    title: "Замена сцепления (DSG)",
    price: "от 18 000 ₽",
    category: "Ремонт",
    icon: <Disc size={24} />,
  },
  {
    title: "Замена масла в АКПП",
    price: "от 3 500 ₽",
    category: "ТО",
    icon: <Droplets size={24} />,
  },
  {
    title: "Адаптация КПП",
    price: "от 2 500 ₽",
    category: "Диагностика",
    icon: <Shield size={24} />,
  },
  {
    title: "Комплексная диагностика",
    price: "3 000 ₽*",
    category: "Диагностика",
    icon: <Activity size={24} />,
    note: "*Бесплатно при ремонте",
  },
];

export default function ServicesClient() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get("brand") as keyof typeof BRANDS;
  const brand = BRANDS[brandParam] || BRANDS.ATT24;

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleBooking = (title: string) => {
    setSelectedService(title);
    setIsSubmitted(false);
    setName("");
    setPhone("");
  };

  const closeMenu = () => setSelectedService(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name,
      phone,
      service: selectedService,
      brand: brand.name,
      source: "Модалка услуг",
    };

    try {
      const response = await fetch("/api/send-tg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Ошибка отправки");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка отправки. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-24 bg-white text-slate-900 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic uppercase">
            Услуги и цены
          </h1>
          <p className="text-slate-500 text-xl md:text-2xl font-medium leading-relaxed">
            Средние цены на обслуживание трансмиссий в техцентре{" "}
            <span
              className={`font-black border-b-4 ${brand.themeColor} border-current pb-1`}
            >
              {brand.name}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_SERVICES.map((s, i) => (
            <div
              key={i}
              className="group p-8 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${brand.bgColor} text-white shadow-lg transition-transform group-hover:scale-110 group-hover:-rotate-3`}
                >
                  {s.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block">
                  {s.category}
                </span>
                <h3 className="text-2xl font-black mb-4 text-slate-900 leading-tight">
                  {s.title}
                </h3>
                <div className="flex flex-col gap-1 mb-8">
                  <p className={`text-3xl font-black ${brand.themeColor}`}>
                    {s.price}
                  </p>
                  {s.note && (
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wider">
                      {s.note}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleBooking(s.title)}
                className={`w-full hover:cursor-pointer py-4 rounded-2xl border-2 border-slate-200 font-black text-slate-900 transition-all flex items-center justify-center gap-2 ${brand.id === "ATT24" ? "hover:bg-red-600 hover:border-red-600" : "hover:bg-blue-600 hover:border-blue-600"} hover:text-white`}
              >
                Записаться
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 ml-[3%] mr-[3%] bg-slate-900 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="text-slate-400 max-w-md">
              Наши мастера бесплатно проконсультируют вас по телефону или в
              мессенджерах.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${brand.phoneFull}`}
              className={`px-8 py-4 ${brand.bgColor} text-white rounded-2xl font-bold hover:scale-105 transition-transform active:scale-95`}
            >
              Спросить мастера
            </a>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={closeMenu}
          />
          <div className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden">
            <button
              onClick={closeMenu}
              className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-12 text-center">
              {!isSubmitted ? (
                <>
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${brand.lightBg} ${brand.themeColor} rounded-2xl mb-6`}
                  >
                    <Activity size={32} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-2">
                    Запись на сервис
                  </h3>
                  <p className="text-slate-500 font-medium mb-8">
                    Услуга:{" "}
                    <span className="text-slate-900 font-bold">
                      {selectedService}
                    </span>
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group text-left">
                      <User
                        className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:${brand.themeColor}`}
                        size={20}
                      />
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all font-bold"
                      />
                    </div>
                    <div className="relative group text-left">
                      <Phone
                        className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:${brand.themeColor}`}
                        size={20}
                      />
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-slate-100 transition-all font-bold"
                      />
                    </div>
                    <button
                      disabled={loading}
                      type="submit"
                      className={`w-full py-5 ${brand.bgColor} ${brand.hoverBg} text-white rounded-2xl font-black text-xl shadow-xl transition-all active:scale-95 mt-4 disabled:opacity-50`}
                    >
                      {loading ? "Отправка..." : "Подтвердить запись"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle size={48} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-2">
                    Заявка принята!
                  </h3>
                  <p className="text-slate-500 font-medium mb-8">
                    Свяжемся с вами в течение 5 минут.
                  </p>
                  <button
                    onClick={closeMenu}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold"
                  >
                    Отлично
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
