// src/Notebook.jsx
import React from "react";
import "./Notebook.css";
import bgImage from "@assets/photo_2025-09-27_08-49-01.jpg"; 
import { useTranslation } from "react-i18next";

export default function Notebook() {
  const { t } = useTranslation();

  return (
    <div className="notebook-split">
      <aside className="left">
        <div className="left-inner">
          <div className="vertical-title">{t("notebook.verticalTitle")}</div>

          <h1 className="headline">{t("notebook.headline")}</h1>

          <p className="sub">{t("notebook.sub")}</p>

          <a
            className="cta"
            href={t("notebook.ctaLink")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("notebook.ctaText")}
          </a>
        </div>
      </aside>

      <main
        className="right"
        style={{ backgroundImage: `url(${bgImage})` }}
        role="img"
        aria-label={t("notebook.imageAlt")}
      >
        <div className="overlay">
          <h2 className="page-title">{t("notebook.overlayTitle")}</h2>
          <p className="page-sub">{t("notebook.overlaySub")}</p>
        </div>
      </main>
    </div>
  );
}
