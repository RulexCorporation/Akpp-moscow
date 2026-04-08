import { Metadata } from "next";
import CasesClient from "../clients/CasesClient";
import BlogClient from "../clients/BlogClient";

export const metadata: Metadata = {
  title: "Блог АКПП | Полезные статьи о ремонте и обслуживании коробок передач",
  description:
    "Узнайте всё об эксплуатации АКПП, вариаторов и DSG. Советы мастеров по замене масла, симптомы неисправностей и способы продлить жизнь вашей трансмиссии от техцентра ATT24.",
  keywords: [
    "статьи о ремонте АКПП",
    "советы по эксплуатации вариатора",
    "симптомы поломки DSG",
    "замена масла в АКПП рекомендации",
    "почему пинается коробка автомат",
    "обслуживание трансмиссии",
    "технический блог автосервиса",
    "диагностика АКПП своими руками",
    "ремонт гидроблока симптомы",
    "ATT24 блог",
    "Test Transmission статьи",
  ],
};

export default function BlogPage() {
  return <BlogClient />;
}
