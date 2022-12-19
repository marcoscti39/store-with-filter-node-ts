import fs from "fs/promises";

export const readProducts = async () => {
  try {
    const data = await fs.readFile("./src/productsData.json", {
      encoding: "utf-8",
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
