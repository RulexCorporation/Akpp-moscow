"use client";
import React, { useState } from "react";
import {
  BookOpen,
  Clock,
  ChevronRight,
  Calendar,
  User,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { BRANDS } from "@/constants/branding";
import { BLOG_POSTS } from "@/constants/posts";

export default function BlogClient() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get("brand") as keyof typeof BRANDS;
  const brand = BRANDS[brandParam] || BRANDS.ATT24;

  const [selectedPost, setSelectedPost] = useState<
    (typeof BLOG_POSTS)[0] | null
  >(null);

  if (selectedPost) {
    return (
      <BlogPostDetail
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        brand={brand}
        allPosts={BLOG_POSTS}
        onSelectPost={setSelectedPost}
      />
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-12 h-1 bg-slate-900 rounded-full`}></span>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                Бортжурнал экспертов
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Советы по уходу за <span className={brand.themeColor}>АКПП</span>
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl">
              Статьи от наших мастеров с многолетним опытом. Честно, без воды,
              только проверенные рекомендации.
            </p>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <BookOpen size={18} />
            <span className="text-sm font-bold">
              {BLOG_POSTS.length} статей
            </span>
          </div>
        </div>

        {/* Сетка статей */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer flex flex-col h-full bg-slate-50 rounded-4xl overflow-hidden border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
            >
              {/* Изображение */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-900 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Контент */}
              <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-3 mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                  {post.title}
                </h3>

                {/* Показываем только 100 символов (примерно) */}
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.shortText}
                </p>

                <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-200/60">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white shadow-sm">
                      {post.icon}
                    </div>
                    Читать статью
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0`}
                  >
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Экспертный блок "Задай вопрос" */}
        <div className="mt-20 bg-slate-900 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                Не нашли ответ на свой вопрос?
              </h3>
              <p className="text-slate-400 max-w-md">
                Наши мастера бесплатно проконсультируют вас по телефону или в
                мессенджерах.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${brand.phoneFull}`}
                className={`px-8 py-4 ${brand.bgColor} text-white rounded-2xl font-bold hover:scale-105 transition-transform active:scale-95`}
              >
                Спросить мастера
              </a>
            </div>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}

// Компонент детальной страницы новости
function BlogPostDetail({ post, onBack, brand, allPosts, onSelectPost }: any) {
  const [showFullText, setShowFullText] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Кнопка назад */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-bold">Вернуться ко всем статьям</span>
        </button>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Левая колонка - текст статьи */}
          <div className="lg:col-span-2">
            {/* Заголовок и мета-информация */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-3 py-1 ${post.category === "Советы" ? "bg-amber-100 text-amber-700" : post.category === "Эксплуатация" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"} rounded-full text-xs font-bold`}
                >
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 border-b border-slate-100 pb-6">
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {post.readTime} чтения
                </span>
              </div>
            </div>

            {/* Изображение */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Полный текст статьи */}
            <div className="prose prose-slate prose-lg max-w-none">
              {post.fullText
                .split("\n")
                .map((paragraph: string, idx: number) => {
                  if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                    return (
                      <h3
                        key={idx}
                        className="text-xl font-bold text-slate-900 mt-6 mb-3"
                      >
                        {paragraph.replace(/\*\*/g, "")}
                      </h3>
                    );
                  }
                  if (paragraph.trim().startsWith("-")) {
                    return (
                      <li key={idx} className="ml-6 text-slate-600">
                        {paragraph.substring(1).trim()}
                      </li>
                    );
                  }
                  if (paragraph.trim() === "") return <br key={idx} />;
                  return (
                    <p
                      key={idx}
                      className="text-slate-600 leading-relaxed mb-4"
                    >
                      {paragraph}
                    </p>
                  );
                })}
            </div>

            {/* Кнопка поделиться */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400">
                  Поделиться:
                </span>
                <button className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
              <a
                href={`/#contacts?brand=${brand.id}`}
                className={`px-6 py-3 ${brand.bgColor} text-white rounded-xl font-bold text-sm transition-all hover:scale-105`}
              >
                Записаться на диагностику
              </a>
            </div>
          </div>

          {/* Правая колонка - другие статьи */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen size={20} />
                Другие статьи
              </h3>
              <div className="space-y-4">
                {allPosts
                  .filter((p: any) => p.id !== post.id)
                  .slice(0, 4)
                  .map((relatedPost: any) => (
                    <div
                      key={relatedPost.id}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        onSelectPost(relatedPost);
                      }}
                      className="group cursor-pointer flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md transition-all"
                    >
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          {relatedPost.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <span className="text-xs text-slate-400">
                          {relatedPost.readTime}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Блок с телефоном */}
              <div className="mt-8 p-6 bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl text-white">
                <p className="text-sm font-bold mb-2">Нужна консультация?</p>
                <p className="text-xs text-slate-300 mb-4">
                  Позвоните нашему мастеру
                </p>
                <a
                  href={`tel:${brand.phoneFull}`}
                  className="block text-xl font-black mb-1 hover:text-blue-400 transition-colors"
                >
                  {brand.phone}
                </a>
                <span className="text-[10px] text-green-400">
                  Ежедневно с 9:00 до 21:00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
