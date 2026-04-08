import ServicesClient from "../clients/ServicesClient";

export const metadata = {
  title: "Цены на ремонт АКПП и DSG | Прайс-лист техцентра ATT24",
  description:
    "Узнайте стоимость ремонта АКПП, замены масла и обслуживания трансмиссии. Честные цены без скрытых доплат. Ознакомьтесь с нашим прайс-листом.",
  keywords: [
    "цена ремонт акпп",
    "стоимость замены масла кпп",
    "прайс автосервис акпп",
    "ремонт dsg цена",
  ],
};

export default function ServicesPage() {
  return <ServicesClient />;
}
