import ContactsClient from "../clients/ContactsClient";

export const metadata = {
  title: "Контакты техцентра ATT24 | Адрес и телефон в Москве",
  description:
    "Мы находимся в Москве по адресу: Югорский проезд, 2с3А. Работаем ежедневно с 08:00 до 21:00. Запишитесь на бесплатную диагностику по телефону: +79532786493.",
  keywords: [
    "автосервис акпп адрес",
    "атт24 телефон",
    "ремонт акпп рядом",
    "метро нагорная ремонт авто",
  ],
};

export default function ContactsPage() {
  return <ContactsClient />;
}
