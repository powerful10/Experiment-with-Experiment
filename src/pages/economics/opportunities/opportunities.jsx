import React from "react";
import { useTranslation } from "react-i18next";
import "./opportunities.css";
import Books from "@assets/books.webp";
import Courses from "@assets/courses.webp";
import Competitions from "@assets/competitions.webp";

const imageMap = {
  books: Books,
  courses: Courses,
  competitions: Competitions,
};

export default function Opportunities() {
  const { t } = useTranslation();

  // t(...) may return object or array depending on your JSON; be defensive
  let categoriesRaw = t("opportunities.categories", { returnObjects: true });
  if (!categoriesRaw) categoriesRaw = {};

  // Normalize into an array of category objects
  const categories = Array.isArray(categoriesRaw)
    ? categoriesRaw
    : Object.values(categoriesRaw);

  // Fallback if some items are plain strings (unlikely for this design)
  const normalized = categories.map((c, i) => {
    if (!c) return null;
    if (typeof c === "string") {
      // if only a string provided, use it as title and pick image by index
      const keys = Object.keys(imageMap);
      const imgKey = keys[i] || keys[0];
      return { id: String(i + 1), title: c, desc: "", img: imgKey, link: "#" };
    }
    return {
      id: c.id ?? String(i + 1),
      title: c.title ?? "",
      desc: c.desc ?? "",
      img: c.img ?? Object.keys(imageMap)[i] ?? null,
      link: c.link ?? "#",
    };
  }).filter(Boolean);

  return (
    <div className="opp-wrap">
      <h1 className="opp-main-title">{t("opportunities.mainTitle")}</h1>
      <p className="opp-subtitle">{t("opportunities.subtitle")}</p>

      <div className="opp-grid">
        {normalized.map((cat, idx) => {
          const imgSrc = cat.img && imageMap[cat.img] ? imageMap[cat.img] : null;
          const key = cat.id || `${cat.title}-${idx}`;
          return (
            <article key={key} className="opp-card">
              {imgSrc ? (
                <img src={imgSrc} alt={cat.title} className="opp-img" />
              ) : (
                <div className="opp-img placeholder" aria-hidden="true" />
              )}
              <div className="opp-body">
                <h2>{cat.title}</h2>
                <p>{cat.desc}</p>
                <a href={cat.link} className="opp-btn">
                  {t("opportunities.explore_template", { category: cat.title })}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
