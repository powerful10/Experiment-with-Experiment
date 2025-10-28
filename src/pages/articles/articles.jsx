import React from "react";
import { Link, useLocation } from "react-router-dom";
import Image1 from "@assets/image.jpg";
import Image2 from "@assets/notebookPhoto.jpg";
import "./article.css";
import { useTranslation } from "react-i18next";

const Articles = () => {
const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const focus = query.get("focus");

  // Images stay local, text comes from JSON
  const articles = [
    {
      id: "supply-demand",
      img: Image1,
    },
    {
      id: "global-trade",
      img: Image2,
    },
  ];

  return (
    <section className="articles-page">
      {/* Translated title & subtitle */}
      <h2 className="articles-title">{t("articles.component.title")}</h2>
      <p className="page-sub">{t("articles.component.subtitle")}</p>

      <div className="articles-grid">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className={`article-card ${focus === article.id ? "highlight" : ""}`}
          >
            <img src={article.img} alt={t(`articles.component.items.${index}.title`)} className="article-img" />
            <div className="article-content">
              <h3 className="article-title">
                {t(`articles.component.items.${index}.title`)}
              </h3>
              <p className="article-text">
                {t(`articles.component.items.${index}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="articles-footer">
        <Link to="/articles" className="article-btn">
          {t("articles.component.read_more")}
        </Link>
      </div>
    </section>
  );
};

export default Articles;
