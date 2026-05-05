import React from "react";
import styles from "./AlbumCard.module.css";
import Chip from "@mui/material/Chip";

export default function AlbumCard({ image, follows, title, isSong }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />

        <div className={styles.chipWrapper}>
          <Chip
            label={isSong ? `${follows} Likes` : `${follows} Follows`}
            size="small"
            className={styles.chip}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
}
