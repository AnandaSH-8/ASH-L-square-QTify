import React, { useCallback, useEffect, useState } from "react";
import styles from "./Section.module.css";
import axios from "axios";
import AlbumCard from "../AlbumCard/AlbumCard";

export default function Section({ title, endpoint }) {
  const [data, setData] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${endpoint}`);
      setData(res.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2>{title}</h2>
        <button
          className={styles.toggleBtn}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "Show All" : "Collapse"}
        </button>
      </div>

      {/* Grid */}
      {!collapsed && (
        <div className={styles.grid}>
          {data.map((album) => (
            <AlbumCard
              key={album.id}
              image={album.image}
              follows={album.follows}
              title={album.title}
            />
          ))}
        </div>
      )}
    </div>
  );
}
