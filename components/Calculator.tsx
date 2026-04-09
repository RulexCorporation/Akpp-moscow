"use client";
import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Phone,
  CheckCircle,
  Calculator as CalcIcon,
  User,
  Loader2,
} from "lucide-react";
import { CALC_STEPS } from "@/constants/calc";

export default function Calculator({ brand }: any) {
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSelect = (option: any) => {
    if (option.label.toLowerCase().includes("диагностика")) {
      setTotal(0);
    } else {
      setTotal((prev) => prev + option.value);
    }

    if (step < CALC_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setStep(0);
    setTotal(0);
    setIsFinished(false);
    setName("");
    setPhone("");
    setSuccess(false);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!phone || phone.length < 10) {
      return alert("Пожалуйста, введите корректный номер телефона");
    }

    setLoading(true);

    const data = {
      name,
      phone,
      total,
      brand: brand.name,
      source: "Калькулятор на сайте",
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
        setSuccess(true);
      } else {
        throw new Error("Ошибка сервера");
      }
    } catch (e) {
      alert("Произошла ошибка при отправке. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-[40px] shadow-xl shadow-slate-200 overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black">Калькулятор ремонта</h2>
              <p className="text-slate-400 text-sm">
                Узнайте стоимость за 30 секунд
              </p>
            </div>
            <div
              className={`${brand.bgColor} p-3 rounded-2xl shadow-lg transition-transform hover:rotate-12`}
            >
              <CalcIcon size={24} className="text-white" />
            </div>
          </div>

          <div className="p-8 md:p-12">
            {!isFinished ? (
              <>
                {/* Progress Bar */}
                <div className="mb-10">
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">
                    <span>
                      Шаг {step + 1} из {CALC_STEPS.length}
                    </span>
                    <span>
                      {Math.round(((step + 1) / CALC_STEPS.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${brand.bgColor} transition-all duration-700 ease-out`}
                      style={{
                        width: `${((step + 1) / CALC_STEPS.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 tracking-tight">
                  {CALC_STEPS[step].title}
                </h3>

                <div className="grid gap-4">
                  {CALC_STEPS[step].options.map((opt: any) => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(opt)}
                      className="group flex items-center justify-between p-6 bg-white border-2 border-slate-100 rounded-2xl transition-all text-left hover:border-slate-300 hover:shadow-md active:scale-[0.99]"
                    >
                      <span className="font-bold text-slate-700 flex items-center gap-3">
                        {opt.icon && (
                          <span className="text-2xl">{opt.icon}</span>
                        )}
                        {opt.label}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ${brand.bgColor} text-white`}
                      >
                        <ChevronRight size={18} />
                      </div>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-8 text-slate-400 font-bold flex items-center gap-2 hover:text-slate-600 transition-colors"
                  >
                    <ChevronLeft size={18} /> Назад
                  </button>
                )}
              </>
            ) : success ? (
              <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div
                  className={`inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-6`}
                >
                  <CheckCircle size={56} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">
                  Заявка принята!
                </h3>
                <p className="text-slate-500 text-lg mb-8">
                  Менеджер свяжется с вами в течение 5 минут для уточнения
                  деталей.
                </p>
                <button
                  onClick={reset}
                  className={`px-8 py-4 ${brand.bgColor} text-white rounded-2xl font-bold transition-transform active:scale-95`}
                >
                  Вернуться на главную
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 ${brand.lightBg} ${brand.themeColor} rounded-full mb-6`}
                >
                  <CheckCircle size={44} />
                </div>

                <h3 className="text-3xl font-black text-slate-900 mb-2">
                  {total === 0
                    ? "Диагностика для вас:"
                    : "Предварительный расчет:"}
                </h3>

                <div className="mb-10">
                  <p
                    className={`text-6xl font-black ${brand.themeColor} leading-none tracking-tighter`}
                  >
                    {total === 0 ? "0 ₽" : `от ${total.toLocaleString()} ₽`}
                  </p>
                  <p className="text-slate-500 font-bold mt-4 uppercase tracking-widest text-xs">
                    {total === 0
                      ? "бесплатно при условии ремонта"
                      : "стоимость работ и запчастей"}
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-4 mb-10">
                  <div className="relative group">
                    <User
                      className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:${brand.themeColor}`}
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white outline-none transition-all font-medium text-slate-900 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div className="relative group">
                    <Phone
                      className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:${brand.themeColor}`}
                      size={20}
                    />
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white outline-none transition-all font-medium text-slate-900 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 max-w-md mx-auto">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full py-5 ${brand.bgColor} ${brand.hoverBg} text-white rounded-2xl font-bold text-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        <Phone size={22} />
                        {total === 0
                          ? "Записаться бесплатно"
                          : "Зафиксировать цену"}
                      </>
                    )}
                  </button>

                  <button
                    onClick={reset}
                    className="text-slate-400 font-bold hover:text-slate-600 text-sm transition-colors mt-2"
                  >
                    Пересчитать заново
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
