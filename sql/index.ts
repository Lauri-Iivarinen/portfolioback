import sqlite3 from "sqlite3";

export const initDb: () => sqlite3.Database = () => {
    const db = new sqlite3.Database('database.db')
    return db
}

