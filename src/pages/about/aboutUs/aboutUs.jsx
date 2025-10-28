import React from "react";
import "./aboutUs.css";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t, i18n } = useTranslation();
  
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
  
  return (
    <section className="about-page">
      <h2 className="page-title">{t("about.title")}</h2>
        <p>{t("about.subtitle")}</p>

      <div className="about-content">
        <p>{t("about.paragraphs.p1")}</p>
        <p>{t("about.paragraphs.p2")}</p>
        <p>{t("about.paragraphs.p3")}</p>
      </div>
    </section>
  );
};

export default About;
