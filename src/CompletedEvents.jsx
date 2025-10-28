// src/CompletedEvents.jsx
import { useTranslation } from "react-i18next";
import "./CompletedEvents.css";
import image1 from "./assets/download (1).jpg";
import image2 from "./assets/download.jpg";
import image3 from "./assets/download.png";
import image4 from "./assets/image.jpg";
import image5 from "./assets/logo.jpg";

const events = [
  { id: 1, date: "2025-10-12", image: image1 },
  { id: 2, date: "2025-09-22", image: image2 },
  { id: 3, date: "2025-11-05", image: image3 },
  { id: 4, date: "2025-08-18", image: image4 },
  { id: 5, date: "2025-12-01", image: image5 },
];

// Function to pick `n` random events
function getRandomEvents(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function CompletedEvents() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const randomEvents = getRandomEvents(events, 3);

  return (
    <section className="completed-events container" aria-label={t("completedEvents.ariaLabel")}>
      <h2 className="events-title">{t("completedEvents.title")}</h2>

      <div className="events-grid">
        {randomEvents.map((event) => (
          <article key={event.id} className="event-card">
            <img
              className="event-image"
              src={event.image}
              alt={t(`completedEvents.events.${event.id}.title`)}
            />
            <div className="event-content">
              <h3 className="event-title">{t(`completedEvents.events.${event.id}.title`)}</h3>
              <p className="event-desc">
                {t(`completedEvents.events.${event.id}.description`)}
              </p>
              <p className="event-info">
                <strong>{t("completedEvents.event_date_label")}</strong> {event.date} <br />
                <strong>{t("completedEvents.event_location_label")}</strong>{" "}
                {t(`completedEvents.events.${event.id}.location`)}
              </p>
              <a className="event-button" href="#">
                {t("completedEvents.details_button")}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CompletedEvents;
