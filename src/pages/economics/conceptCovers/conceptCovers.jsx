// src/ConceptCovers.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import "./ConceptCovers.css";
import { useTranslation } from "react-i18next";

// Micro images
import BehavioralImg from "@assets/CCImages/micro/1.webp";
import PpcImg from "@assets/CCImages/micro/2.webp";
import ScaleImg from "@assets/CCImages/micro/3.webp";
import ElasticityImg from "@assets/CCImages/micro/4.webp";
import ExternalitiesImg from "@assets/CCImages/micro/5.webp";
import AsymmetricImg from "@assets/CCImages/micro/6.webp";
import EnvEcoImg from "@assets/CCImages/micro/7.webp";
import PriceDetImg from "@assets/CCImages/micro/8.webp";
import HouseholdImg from "@assets/CCImages/micro/9.webp";
import CapitalLabourImg from "@assets/CCImages/micro/10.webp";
import StatementsImg from "@assets/CCImages/micro/11.webp";
import DecisionImg from "@assets/CCImages/micro/12.webp";
import MeritImg from "@assets/CCImages/micro/13.webp";
import CircularFlowImg from "@assets/CCImages/micro/14.webp";
import BusinessTypesImg from "@assets/CCImages/micro/15.webp";
import DemandSupplyImg from "@assets/CCImages/micro/16.webp";
import MergersImg from "@assets/CCImages/micro/17.webp";
import MonopoliesImg from "@assets/CCImages/micro/18.webp";
import BanksImg from "@assets/CCImages/micro/19.webp";
import UnionsImg from "@assets/CCImages/micro/20.webp";
import BarterImg from "@assets/CCImages/micro/21.webp";
import SpecializationImg from "@assets/CCImages/micro/22.webp";
import ProblemImg from "@assets/CCImages/micro/23.webp";
import FactorsImg from "@assets/CCImages/micro/24.webp";
import OpportunityCostImg from "@assets/CCImages/micro/25.webp";

// Macro images
import GlobalisationImg from "@assets/CCImages/macro/1.webp";
import BusinessCycleImg from "@assets/CCImages/macro/2.webp";
import PhillipsImg from "@assets/CCImages/macro/3.webp";
import InterventionImg from "@assets/CCImages/macro/4.webp";
import GrowthImg from "@assets/CCImages/macro/5.webp";
import PovertyImg from "@assets/CCImages/macro/6.webp";
import SpecializationNationalImg from "@assets/CCImages/macro/7.webp";
import ForexImg from "@assets/CCImages/macro/8.webp";
import InflationImg from "@assets/CCImages/macro/9.webp";
import BalanceImg from "@assets/CCImages/macro/10.webp";
import ADASImg from "@assets/CCImages/macro/11.webp";
import DevelopmentImg from "@assets/CCImages/macro/12.webp";
import SupplySideImg from "@assets/CCImages/macro/13.webp";
import CentralBanksImg from "@assets/CCImages/macro/14.webp";
import MonetaryImg from "@assets/CCImages/macro/15.webp";
import FiscalImg from "@assets/CCImages/macro/16.webp";
import TypesEconomiesImg from "@assets/CCImages/macro/17.webp";
import TradeImg from "@assets/CCImages/macro/18.webp";

// imageMap keyed by ENGLISH canonical titles (unchanged)
const imageMap = {
  // Micro (English canonical names)
  "Introduction to Behavioral Economics": BehavioralImg,
  "Production Possibility Curve": PpcImg,
  "Economies of Scale": ScaleImg,
  "Price Elasticity of Demand": ElasticityImg,
  "Externalities": ExternalitiesImg,
  "Introduction to Asymmetric Information": AsymmetricImg,
  "Environmental Economics": EnvEcoImg,
  "Price Determinants": PriceDetImg,
  "Influences on Household Spending, Saving, and Borrowing": HouseholdImg,
  "Capital and Labour Intensive Productions Comparison": CapitalLabourImg,
  "Positive and Normative Statements": StatementsImg,
  "Rational Decision Making": DecisionImg,
  "Merit Goods": MeritImg,
  "The Circular Flow of Income and Spending": CircularFlowImg,
  "Types of Business Organizations": BusinessTypesImg,
  "Demand and Supply": DemandSupplyImg,
  "Mergers": MergersImg,
  "Monopolies": MonopoliesImg,
  "Commercial Banks": BanksImg,
  "Trade Unions": UnionsImg,
  "Bartering": BarterImg,
  "Specialization": SpecializationImg,
  "The Economic Problem": ProblemImg,
  "Factors of Production": FactorsImg,
  "Opportunity Cost": OpportunityCostImg,

  // Macro
  "Globalisation": GlobalisationImg,
  "Business Cycle": BusinessCycleImg,
  "Phillips Curve": PhillipsImg,
  "Government Intervention": InterventionImg,
  "Economic Growth": GrowthImg,
  "Poverty": PovertyImg,
  "National Specialization": SpecializationNationalImg,
  "Foreign Exchange Rates": ForexImg,
  "Inflation and Deflation": InflationImg,
  "Balance of Payments": BalanceImg,
  "Aggregate Demand & Aggregate Supply": ADASImg,
  "Development of Economies": DevelopmentImg,
  "Supply Side Policy": SupplySideImg,
  "Central Banks": CentralBanksImg,
  "Monetary Policy": MonetaryImg,
  "Fiscal Policy": FiscalImg,
  "Types of Economies": TypesEconomiesImg,
  "International Trade": TradeImg,
};

// ====== IMPORTANT: english keys arrays must match the ORIGINAL English order used to build images ======
const englishMicroKeys = [
  "Introduction to Behavioral Economics",
  "Production Possibility Curve",
  "Economies of Scale",
  "Price Elasticity of Demand",
  "Externalities",
  "Introduction to Asymmetric Information",
  "Environmental Economics",
  "Price Determinants",
  "Influences on Household Spending, Saving, and Borrowing",
  "Capital and Labour Intensive Productions Comparison",
  "Positive and Normative Statements",
  "Rational Decision Making",
  "Merit Goods",
  "The Circular Flow of Income and Spending",
  "Types of Business Organizations",
  "Demand and Supply",
  "Mergers",
  "Monopolies",
  "Commercial Banks",
  "Trade Unions",
  "Bartering",
  "Specialization",
  "The Economic Problem",
  "Factors of Production",
  "Opportunity Cost",
];

const englishMacroKeys = [
  "Globalisation",
  "Business Cycle",
  "Phillips Curve",
  "Government Intervention",
  "Economic Growth",
  "Poverty",
  "National Specialization",
  "Foreign Exchange Rates",
  "Inflation and Deflation",
  "Balance of Payments",
  "Aggregate Demand & Aggregate Supply",
  "Development of Economies",
  "Supply Side Policy",
  "Central Banks",
  "Monetary Policy",
  "Fiscal Policy",
  "Types of Economies",
  "International Trade",
];

const makeCardData = (title, section, idx, imgCandidate) => ({
  id: `${section}-${idx}`,
  title,
  section,
  // imgCandidate (picked by english-key) preferred; fallback try imageMap[title] (in case English slipped in)
  img: imgCandidate || imageMap[title] || "",
  href: "#",
});

export default function ConceptCovers() {
  const { t } = useTranslation();

  // translated titles arrays from JSON (order must match english keys arrays)
  const microTitles = t("conceptCovers.micro_concepts", { returnObjects: true }) || [];
  const macroTitles = t("conceptCovers.macro_concepts", { returnObjects: true }) || [];

  const allCards = useMemo(() => {
    const microCards = microTitles.map((title, i) =>
      makeCardData(title, "Microeconomics", i, imageMap[englishMicroKeys[i]])
    );
    const macroCards = macroTitles.map((title, i) =>
      makeCardData(title, "Macroeconomics", i, imageMap[englishMacroKeys[i]])
    );
    return [...microCards, ...macroCards];
  }, [microTitles, macroTitles]);

  const [query, setQuery] = useState("");
  const [visibleIds, setVisibleIds] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (entry.isIntersecting) setVisibleIds((prev) => new Set(prev).add(id));
        });
      },
      { threshold: 0.12 }
    );

    const el = containerRef.current;
    if (!el) return;
    el.querySelectorAll(".card").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCards;
    return allCards.filter((c) => c.title.toLowerCase().includes(q) || c.section.toLowerCase().includes(q));
  }, [allCards, query]);

  const microFiltered = filtered.filter((c) => c.section === "Microeconomics");
  const macroFiltered = filtered.filter((c) => c.section === "Macroeconomics");

  const gridClass = (list) => `card-grid ${list.length === 1 && filtered.length === 1 ? "single-card-grid" : ""}`;

  return (
    <div className="ap-container">
      <header className="ap-header">
        <h1>{t("conceptCovers.header")}</h1>
        <div className="search-wrap">
          <input
            className="search-input"
            placeholder={t("conceptCovers.search_placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="search-hint">
            {filtered.length} {filtered.length === 1 ? t("conceptCovers.result_singular") : t("conceptCovers.result_plural")}
          </div>
        </div>
      </header>

      <main ref={containerRef} className="ap-main">
        <section className="section">
          <h2>{t("conceptCovers.micro_title")}</h2>
          <div className={gridClass(microFiltered)}>
            {microFiltered.map((card) => (
              <article key={card.id} className={`card ${visibleIds.has(card.id) ? "visible" : ""}`} data-id={card.id}>
                {card.img ? <img src={card.img} alt={card.title} className="card-img" /> : <div className="card-img placeholder" />}
                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <a className="card-link" href={card.href}>
                    {t("conceptCovers.read_more")}
                  </a>
                </div>
              </article>
            ))}
            {microFiltered.length === 0 && <div className="empty-state">{t("conceptCovers.empty_micro")}</div>}
          </div>
        </section>

        <section className="section">
          <h2>{t("conceptCovers.macro_title")}</h2>
          <div className={gridClass(macroFiltered)}>
            {macroFiltered.map((card) => (
              <article key={card.id} className={`card ${visibleIds.has(card.id) ? "visible" : ""}`} data-id={card.id}>
                {card.img ? <img src={card.img} alt={card.title} className="card-img" /> : <div className="card-img placeholder" />}
                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <a className="card-link" href={card.href}>
                    {t("conceptCovers.read_more")}
                  </a>
                </div>
              </article>
            ))}
            {macroFiltered.length === 0 && <div className="empty-state">{t("conceptCovers.empty_macro")}</div>}
          </div>
        </section>
      </main>
    </div>
  );
}
