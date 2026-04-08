import HomeClient from "./clients/HomeClient";

export const metadata = {
  title: "Ремонт АКПП в Москве | Техцентр ATT24 | Гарантия 2 года",
  description:
    "Профессиональный ремонт и диагностика АКПП, DSG и вариаторов в Москве. Бесплатная эвакуация и диагностика при ремонте. Запчасти в наличии. Звоните!",
  keywords: [
    "ремонт акпп москва",
    "диагностика кпп",
    "ремонт дсг",
    "ремонт вариатора",
    "атт24",
  ],
  openGraph: {
    title: "Ремонт АКПП в техцентре ATT24",
    description: "Вернем вашу коробку к жизни за 3 дня с гарантией.",
    images: ["/logo/logo_all.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
