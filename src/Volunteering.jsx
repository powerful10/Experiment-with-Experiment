// src/Volunteering.jsx
import "./Volunteering.css";
import { useTranslation } from "react-i18next";

function Volunteering() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <section className="volunteering-section container" aria-label={t("volunteering.ariaLabel")}>
      <h2 className="volunteering-title">{t("volunteering.title")}</h2>
      <p className="volunteering-subtext">
      {t("volunteering.title")}      
       </p>

      <form className="volunteering-form">
        <div className="form-row">
          <input type="text" placeholder={t("volunteering.placeholders.firstName")} name="firstName" required />
          <input type="text" placeholder={t("volunteering.placeholders.lastName")} name="lastName" required />
        </div>
        <input type="email" placeholder={t("volunteering.placeholders.email")} name="email" required />
        <textarea
          placeholder={t("volunteering.placeholders.skills")}
          name="skills"
          rows="5"
          required
        ></textarea>
        <button type="submit" className="submit-button">{t("volunteering.submit")}</button>
      </form>
    </section>
  );
}

export default Volunteering;
