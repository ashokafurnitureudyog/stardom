"use client";
import React from "react";
import styles from "./DashboardLoader.module.css";

export const DashboardLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
      <div className={styles.banterLoader}>
        <div
          className={styles.banterLoaderBox}
          style={{ backgroundColor: "#A28B55" }}
        ></div>
        <div
          className={styles.banterLoaderBox}
          style={{ backgroundColor: "#A28B55" }}
        ></div>
        <div
          className={styles.banterLoaderBox}
          style={{ backgroundColor: "#A28B55" }}
        ></div>
        <div
          className={styles.banterLoaderBox}
          style={{ backgroundColor: "#A28B55" }}
        ></div>
        <div
          className={styles.banterLoaderBox}
          style={{ backgroundColor: "#A28B55" }}
        ></div>
        <div
          className={styles.banterLoaderBox}
          style={{ backgroundColor: "#A28B55" }}
        ></div>
        <div
          className={styles.banterLoaderBox}
          style={{ backgroundColor: "#A28B55" }}
        ></div>
        <div
          className={styles.banterLoaderBox}
          style={{ backgroundColor: "#A28B55" }}
        ></div>
        <div
          className={styles.banterLoaderBox}
          style={{ backgroundColor: "#A28B55" }}
        ></div>
      </div>
    </div>
  );
};
