import { ShieldCheck, Clock, Toolbox, Coins } from "lucide-react";

const features = [
  {
    title: "Гарантия 2 года",
    desc: "Закреплено в договоре",
    icon: ShieldCheck,
  },
  { title: "Свой склад", desc: "Запчасти в наличии", icon: Toolbox },
  { title: "Ремонт от 1 дня", desc: "Быстро и надежно", icon: Clock },
  { title: "Честная цена", desc: "Дефектовка при вас", icon: Coins },
];

export default function TrustFeatures({ brand }: any) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group p-6 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent ${brand.id === "ATT24" ? "hover:border-blue-100" : "hover:border-red-100"}`}
            >
              <div
                className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform ${brand.themeColor}`}
              >
                <f.icon size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">{f.title}</h4>
              <p className="text-slate-500 text-xs leading-snug">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
