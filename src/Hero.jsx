// src/Hero.jsx
import "./Hero.css";
import heroImage from "./assets/image.jpg"; // <-- replace with your own image
import { useTranslation } from "react-i18next";

function Hero() {
   const { t, i18n } = useTranslation();
  
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
  
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <h1 className="hero-title">{t("hero.title")}</h1>
        <p className="hero-subtitle">
          {t("hero.subtitle")}
        </p>
      </div>
    </section>
  );
}

export default Hero;
