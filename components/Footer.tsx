"use client";
import { Phone, MapPin, Clock, Send, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function Footer({ brand }: any) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 md:py-24 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Колонка 1: Бренд и описание */}
          <div className="space-y-6">
            {brand.logo_url ? (
              <Image
                src={brand.logo_url}
                alt={brand.name}
                width={190}
                height={80}
                className={brand.id === "ATT24" ? "bg-white" : "bg-white p-5"} // Делаем лого белым для темного фона
              />
            ) : (
              <span className="text-2xl font-black text-white">
                {brand.name}
              </span>
            )}
            <p className="text-sm leading-relaxed max-w-xs">
              Профессиональный ремонт и обслуживание автоматических трансмиссий
              всех типов в Москве. Работаем более 10 лет.
            </p>
            <div className="flex gap-4">
              {brand.tg && (
                <a
                  href={brand.tg}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-slate-800 hover:text-white ${brand.id === "ATT24" ? "hover:bg-red-600" : "hover:bg-blue-600"}`}
                >
                  <Send size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Колонка 2: Контакты */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className={brand.themeColor} />
                <span className="text-sm">{brand.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${brand.phoneFull}`}
                  className="flex items-center gap-3 group transition-colors hover:text-white"
                >
                  <Phone size={20} className={brand.themeColor} />
                  <span className="text-lg font-bold text-white">
                    {brand.phone}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Режим работы */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Режим работы</h4>
            <div className="flex items-start gap-3">
              <Clock size={20} className={brand.themeColor} />
              <div className="text-sm space-y-1">
                <p>{brand.workingHours}</p>
                <p className="text-xs text-slate-500 italic">
                  Прием машин круглосуточно
                </p>
              </div>
            </div>
          </div>

          {/* Колонка 4: Гарантии */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Надежность</h4>
            <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3 mb-3 text-white">
                <ShieldCheck size={24} className="text-green-500" />
                <span className="font-bold">Гарантия 2 года</span>
              </div>
              <p className="text-xs leading-relaxed">
                Предоставляем официальную гарантию на все выполненные работы и
                установленные запчасти без ограничения по пробегу.
              </p>
            </div>
          </div>
        </div>

        {/* Нижняя панель */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>
            © {currentYear} {brand.name}. Все права защищены.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Публичная оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
