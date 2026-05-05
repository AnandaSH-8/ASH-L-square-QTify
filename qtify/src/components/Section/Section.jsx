import React, { useEffect, useState } from "react";
import styles from "./Section.module.css";
import axios from "axios";
import AlbumCard from "../AlbumCard/AlbumCard";

export default function Section({ title, endpoint }) {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const VISIBLE_CARDS = 9;

  useEffect(() => {
    axios.get(endpoint).then((res) => setData(res.data));
  }, [endpoint]);

  const handleNext = () => {
    if (startIndex + VISIBLE_CARDS < data.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleData = data.slice(startIndex, startIndex + VISIBLE_CARDS);

  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2>{title}</h2>
        <button
          className={styles.toggleBtn}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Collapse" : "Show All"}
        </button>
      </div>

      {showAll ? (
        <div className={styles.grid}>
          {data.map((album) => (
            <AlbumCard key={album.id} {...album} />
          ))}
        </div>
      ) : (
        <div className={styles.sliderWrapper}>
          <button className={styles.arrowLeft} onClick={handlePrev}>
            ❮
          </button>

          <div className={styles.slider}>
            {visibleData.map((album) => (
              <AlbumCard key={album.id} {...album} />
            ))}
          </div>

          <button className={styles.arrowRight} onClick={handleNext}>
            ❯
          </button>
        </div>
      )}
    </div>
  );
}
