import React, { useEffect, useRef, useState } from "react";
import styles from "./Section.module.css";
import axios from "axios";
import AlbumCard from "../AlbumCard/AlbumCard";

export default function Section({ title, endpoint }) {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    axios.get(endpoint).then((res) => setData(res.data));
  }, [endpoint]);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const scrollAmount = 300; // adjust if needed

    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

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

      {/* GRID VIEW */}
      {showAll ? (
        <div className={styles.grid}>
          {data.map((album) => (
            <AlbumCard key={album.id} {...album} />
          ))}
        </div>
      ) : (
        /* SLIDER VIEW */
        <div className={styles.sliderWrapper}>
          <button className={styles.arrowLeft} onClick={() => scroll("left")}>
            ❮
          </button>

          <div className={styles.slider} ref={sliderRef}>
            {data.map((album) => (
              <AlbumCard key={album.id} {...album} />
            ))}
          </div>

          <button className={styles.arrowRight} onClick={() => scroll("right")}>
            ❯
          </button>
        </div>
      )}
    </div>
  );
}
