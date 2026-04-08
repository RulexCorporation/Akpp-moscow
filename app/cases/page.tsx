import { Metadata } from "next";
import CasesClient from "../clients/CasesClient";

export const metadata: Metadata = {
  title: "Примеры ремонта АКПП | Фото дефектовки и цены | Техцентр ATT24",
  description:
    "Реальные кейсы по ремонту АКПП, вариаторов и DSG. Фотоотчеты разборки, описание неисправностей, сроки и итоговая стоимость работ в техцентрах ATT24 и Test Transmission.",
  keywords: [
    "ремонт АКПП примеры работ",
    "кейс ремонт коробки автомат",
    "фотоотчет дефектовка АКПП",
    "цена ремонта АКПП Москва",
    "ремонт вариатора отзывы",
    "сколько стоит ремонт коробки передач",
    "сервис по ремонту трансмиссии",
    "дефектовка АКПП с фото",
    "обслуживание коробок передач",
    "ATT24",
    "Test Transmission",
  ],
  openGraph: {
    title: "Наши работы по ремонту АКПП | ATT24",
    description:
      "Прозрачный ремонт коробок передач с полным фотоотчетом процесса.",
    type: "website",
    url: "https://remont-akkp.ru/cases",
    images: [
      {
        url: "/cases/audi-a6.webp",
        width: 1200,
        height: 630,
        alt: "Примеры ремонта АКПП",
      },
    ],
  },
};

export default function CasesPage() {
  return <CasesClient />;
}
