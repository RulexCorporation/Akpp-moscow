import { Settings, Zap, Repeat, Layers } from "lucide-react";

export const SERVICES = [
  {
    id: "akpp",
    title: "Ремонт АКПП",
    description: "Капитальный ремонт классических гидроавтоматов всех марок.",
    icon: Settings,
    price: "от 12 000 ₽",
  },
  {
    id: "cvt",
    title: "Ремонт Вариаторов",
    description: "Замена ремня, шлифовка конусов и калибровка давления масла.",
    icon: Repeat,
    price: "от 15 000 ₽",
  },
  {
    id: "dsg",
    title: "Ремонт DSG / PowerShift",
    description: "Замена сцепления, ремонт мехатроника и прошивка ПО.",
    icon: Zap,
    price: "от 9 000 ₽",
  },
  {
    id: "hydro",
    title: "Ремонт гидроблоков",
    description: "Проверка на стенде, замена соленоидов и промывка каналов.",
    icon: Layers,
    price: "от 7 000 ₽",
  },
];
