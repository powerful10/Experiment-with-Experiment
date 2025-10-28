import { useState } from "react";
import "./articlesPage.css";
import { useTranslation } from "react-i18next";

export default function ArticlesPage() {
  const { t } = useTranslation();

  return (
    <div className="articles-page">
      <h1 className="page-title">{t("page.title")}</h1>

      <Article
        title={t("page.articles.1.title")}
        content={t("page.articles.1.content")}
      />

      <Article
        title={t("page.articles.2.title")}
        content={t("page.articles.2.content")}
      />

      <Article
        title={t("page.articles.3.title")}
        content={t("page.articles.3.content")}
      />
    </div>
  );
}

function Article({ title, content }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="article-full">
      <div className="article-header" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="article-heading">{title}</h2>
        <span className="toggle-icon">
          {isOpen ? t("page.toggle_open") : t("page.toggle_closed")}
        </span>
      </div>
      {isOpen && (
        <div className="article-content">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}
