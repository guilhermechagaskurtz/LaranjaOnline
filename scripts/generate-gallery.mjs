// scripts/generate-gallery.mjs
import fs from "fs";
import path from "path";

const galleryPath = path.join(process.cwd(), "public", "galery");
const outputPath = path.join(process.cwd(), "src", "lib", "gallery-data.json");

const files = fs
  .readdirSync(galleryPath)
  .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
  .map((file) => `galery/${file}`); // Use o caminho público a partir da raiz

const data = JSON.stringify({ images: files });

fs.writeFileSync(outputPath, data);
console.log("✅ Lista de imagens da galeria gerada com sucesso!");