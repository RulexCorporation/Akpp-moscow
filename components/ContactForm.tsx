"use client";
import { useState } from "react";
import { User, Phone, Send, CheckCircle } from "lucide-react";

export default function ContactForm({ brand }: any) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("https://moskva-akpp.ru/send_tg.php", {
        method: "POST",
        body: JSON.stringify({
          name,
          phone,
          brand: brand.name,
          source: "Контактная форма",
        }),
      });
      setIsSent(true);
    } catch (error) {
      alert("Ошибка отправки.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacts" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`relative max-w-5xl mx-auto rounded-[40px] p-8 md:p-16 overflow-hidden shadow-2xl transition-all duration-500 ${brand.bgColor}`}
        >
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                {isSent ? (
                  "Заявка отправлена!"
                ) : (
                  <>
                    Запишитесь на <br /> диагностику{" "}
                    <span className="underline decoration-white/30">0 ₽</span>
                  </>
                )}
              </h2>
              <p className="text-white/80 text-lg font-medium max-w-sm">
                {isSent
                  ? "Мастер перезвонит вам в ближайшее время."
                  : `Оставьте заявку, и мастер ${brand.name} перезвонит вам в течение 5 минут.`}
              </p>
            </div>

            {!isSent ? (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 md:p-10 rounded-4xl shadow-2xl space-y-4"
              >
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    required
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium text-slate-900 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
                <div className="relative group">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    required
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium text-slate-900 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${brand.bgColor} ${brand.hoverBg} disabled:opacity-50`}
                >
                  <Send size={20} />{" "}
                  {loading ? "Отправка..." : "Отправить мастеру"}
                </button>
              </form>
            ) : (
              <div className="bg-white p-10 rounded-4xl flex flex-col items-center text-center">
                <CheckCircle size={60} className="text-green-500 mb-4" />
                <p className="font-bold text-slate-900">
                  Мастер уже получил уведомление!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
