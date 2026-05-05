import React, { useEffect, useState } from "react";
import styles from "./Section.module.css";
import axios from "axios";
import AlbumCard from "../AlbumCard/AlbumCard";
import Carousel from "../Carousel/Carousel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function Section({ title, endpoint, isSongsSection }) {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");

  const filteredData =
    isSongsSection && selectedGenre !== "all"
      ? data.filter((song) => song.genre.key === selectedGenre)
      : data;

  useEffect(() => {
    axios.get(endpoint).then((res) => setData(res.data));

    if (isSongsSection) {
      axios.get("https://qtify-backend.labs.crio.do/genres").then((res) => {
        setGenres([{ key: "all", label: "All" }, ...res.data.data]);
      });
    }
  }, [endpoint, isSongsSection]);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>

        {!isSongsSection && (
          <button
            className={styles.toggleBtn}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Collapse" : "Show All"}
          </button>
        )}
      </div>

      {isSongsSection && (
        <Tabs
          value={selectedGenre}
          onChange={(e, val) => setSelectedGenre(val)}
          textColor="inherit"
          sx={{
            marginBottom: "20px",
            "& .MuiTabs-indicator": {
              backgroundColor: "#34c94b",
            },
          }}
          indicatorColor="primary"
        >
          {genres.map((g) => (
            <Tab key={g.key} label={g.label} value={g.key} />
          ))}
        </Tabs>
      )}

      {isSongsSection ? (
        <Carousel
          data={filteredData}
          renderItem={(song) => (
            <AlbumCard
              key={song.id}
              image={song.image}
              title={song.title}
              follows={song.likes}
              isSong
            />
          )}
        />
      ) : showAll ? (
        <div className={styles.grid}>
          {data.map((album) => (
            <AlbumCard key={album.id} {...album} />
          ))}
        </div>
      ) : (
        <Carousel
          data={data}
          renderItem={(album) => <AlbumCard key={album.id} {...album} />}
        />
      )}
    </div>
  );
}
