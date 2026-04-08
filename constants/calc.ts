export const CALC_STEPS = [
  {
    id: "brand",
    title: "Марка вашего автомобиля",
    options: [
      { label: "Toyota / Lexus", value: 2000, icon: "🇯🇵" },
      { label: "BMW / Mini", value: 2000, icon: "🇩🇪" },
      { label: "Mercedes-Benz", value: 2500, icon: "🇩🇪" },
      { label: "Audi / VW / Skoda", value: 1500, icon: "🇪🇺" },
      { label: "Hyundai / Kia", value: 2000, icon: "🇰🇷" },
      { label: "Nissan / Infiniti", value: 2000, icon: "🇯🇵" },
      { label: "Ford / Mazda", value: 2000, icon: "🇺🇸" },
      { label: "Любая другая марка", value: 2000, icon: "🚗" },
    ],
  },
  {
    id: "type",
    title: "Тип вашей трансмиссии",
    options: [
      { label: "Классический автомат (АКПП)", value: 12000, icon: "⚙️" },
      { label: "Вариатор (CVT)", value: 15000, icon: "🔄" },
      { label: "Робот (DSG / Powershift)", value: 9000, icon: "⚡" },
      { label: "Не знаю тип", value: 10000, icon: "❓" },
    ],
  },
  {
    id: "mileage",
    title: "Пробег автомобиля",
    options: [
      { label: "До 100 000 км", value: 0 },
      { label: "100 000 — 200 000 км", value: 3000 },
      { label: "Свыше 200 000 км", value: 7000 },
    ],
  },
  {
    id: "symptom",
    title: "Что беспокоит?",
    options: [
      { label: "Пинки / Рывки", value: 5000 },
      { label: "Пробуксовка / Заброс оборотов", value: 8000 },
      { label: "Аварийный режим (Шестеренка)", value: 10000 },
      { label: "Шум / Гул / Вибрация", value: 6000 },
      { label: "Течь масла", value: 3000 },
      { label: "Просто диагностика / ТО", value: 0 },
    ],
  },
];
