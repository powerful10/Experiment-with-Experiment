import React from "react";
import "./team.css";
import { useTranslation } from "react-i18next";

import Member1 from "@assets/member1.jpg";
import Member2 from "@assets/member2.jpg";
import Member3 from "@assets/member3.jpg";

const Team = () => {
const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <section className="team-page">
      <h2 className="page-title">{t("team.title")}</h2>
      <p className="page-sub">{t("team.subtitle")}</p>

      <div className="team-grid">
        {/* Member 1 */}
        <div className="team-card">
          <img src={Member1} alt={t("team.members.1.name")} className="team-img" />
          <h3 className="team-name">{t("team.members.1.name")}</h3>
          <p className="team-role">{t("team.members.1.role")}</p>
          <p className="team-bio">{t("team.members.1.bio")}</p>
        </div>

        {/* Member 2 */}
        <div className="team-card">
          <img src={Member2} alt={t("team.members.2.name")} className="team-img" />
          <h3 className="team-name">{t("team.members.2.name")}</h3>
          <p className="team-role">{t("team.members.2.role")}</p>
          <p className="team-bio">{t("team.members.2.bio")}</p>
        </div>

        {/* Member 3 */}
        <div className="team-card">
          <img src={Member3} alt={t("team.members.3.name")} className="team-img" />
          <h3 className="team-name">{t("team.members.3.name")}</h3>
          <p className="team-role">{t("team.members.3.role")}</p>
          <p className="team-bio">{t("team.members.3.bio")}</p>
        </div>
      </div>
    </section>
  );
};

export default Team;
