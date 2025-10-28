import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./podcasts.css";

export default function PodcastGrid() {
  const { t } = useTranslation();
  const [openVideo, setOpenVideo] = useState(null);

  const episodes = t("podcasts.episodes", { returnObjects: true });

  function openEpisode(ep) {
    setOpenVideo(ep);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setOpenVideo(null);
    document.body.style.overflow = "";
  }

  return (
    <div className="podcast-wrap">
      <h2 className="podcast-title">{t("podcasts.title")}</h2>
      <div className="podcast-grid">
        {episodes.map((ep) => (
          <article key={ep.id} className="pod-card">
            <button
              className="thumb-btn"
              onClick={() => openEpisode(ep)}
              aria-haspopup="dialog"
            >
              <img
                className="thumb-img"
                loading="lazy"
                alt={t("podcasts.thumbnail_alt_template", { title: ep.title })}
                src={`https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg`}
                width="320"
                height="180"
              />
              <div className="overlay">
                <span className="play">▶</span>
              </div>
            </button>

            <div className="card-body">
              <h3 className="card-title">{ep.title}</h3>
              <p className="card-desc">{ep.description}</p>
              <div className="tag-row">
                {ep.tags?.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="card-actions">
                <a
                  className="yt-link"
                  href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("podcasts.open_on_youtube")}
                </a>
                <button
                  className="mini-play"
                  onClick={() => openEpisode(ep)}
                  aria-label={t("podcasts.play")}
                >
                  {t("podcasts.play")}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {openVideo && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-inner">
            <header className="modal-head">
              <h3>{openVideo.title}</h3>
              <button className="close-btn" onClick={closeModal}>
                ✕
              </button>
            </header>
            <div className="iframe-wrap">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${openVideo.youtubeId}?autoplay=1&rel=0`}
                title={openVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <button className="modal-backdrop" onClick={closeModal}></button>
        </div>
      )}
    </div>
  );
}
