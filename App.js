import React, { useCallback, useEffect } from "react";
import MainContainer from "./navigation/MainContainer";
import { db } from "./assets/db/connect";


export default function App() {

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`
            CREATE TABLE IF NOT EXISTS fishing (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT,
                image_url TEXT,
                date TEXT,
                time TEXT
            );
        `);
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS caught_fish (
                id INTEGER PRIMARY KEY NOT NULL,
                fishing_id INTEGER REFERENCES fishing(id) ON DELETE CASCADE,
                fish_id INTEGER,
                length REAL,
                weight REAL
            );
        `);
    });
  }, []);

  return <MainContainer></MainContainer>;
}
