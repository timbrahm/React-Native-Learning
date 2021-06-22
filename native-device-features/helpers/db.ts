import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve: Function, reject: Function) =>
    db.transaction((tx: any) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUrl TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_: any, err: any) => {
          reject(err);
        }
      );
    })
  );
  return promise;
};

export const insertPlace = (
  title: string,
  imageUrl: string,
  address: string,
  lat: number,
  lng: number
) => {
  const promise = new Promise((resolve: Function, reject: Function) =>
    db.transaction((tx: any) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUrl, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [title, imageUrl, address, lat, lng],
        (_: any, result: any) => {
          resolve(result);
        },
        (_: any, err: any) => {
          reject(err);
        }
      );
    })
  );
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve: Function, reject: Function) =>
    db.transaction((tx: any) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_: any, result: any) => {
          resolve(result);
        },
        (_: any, err: any) => {
          reject(err);
        }
      );
    })
  );
  return promise;
};
