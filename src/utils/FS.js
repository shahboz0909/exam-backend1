import fs from "fs";
import path from "path";

const read = (dir) =>
  JSON.parse(fs.readFileSync(path.join(process.cwd(), "database", dir)));

const write = (dir, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(process.cwd(),"database", dir),
      JSON.stringify(data, null, 4),
      (err) => {
        if (err) reject(err);

        resolve("OK");
      }
    );
  });
};

export { read, write };
