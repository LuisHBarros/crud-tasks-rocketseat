import fs from "node:fs";

const databasePath = new URL("../database/db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    try {
      const data = fs.readFileSync(databasePath, "utf8");
      this.#database = JSON.parse(data);
    } catch (e) {
      this.#persist();
    }
  }
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database), (err) => {
      if (err) {
        console.error("error", err);
      }
    });
  }

  select(table, id) {
    let data = this.#database[table] ?? [];

    if (id) {
      data = data.filter((row) => {
        return Object.entries(id).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }
    return data;
  }
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
      return true;
    }
    return false;
  }
  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data };
      this.#persist();
    }
    return rowIndex;
  }
}
