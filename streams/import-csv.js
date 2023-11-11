import { parse } from "csv-parse";
import fs from "fs";

const csvPath = new URL("./tasks.csv", import.meta.url);

const stream = fs.createReadStream(csvPath);

const csv = parse({
  delimiter: ",",
  skipEmptyLines: true,
  from_line: 2,
});

async function execute() {
  const linesParse = stream.pipe(csv);

  for await (const line of linesParse) {
    const [title, description] = line;
    await fetch("http://localhost:3333/tasks"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      };
  }
}

execute();
