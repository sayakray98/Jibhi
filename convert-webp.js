import sharp from "sharp";
import fs from "fs";
import path from "path";

const folder = "./src/assets/images";

if (!fs.existsSync(folder)) {
  console.log("Folder not found:", folder);
  process.exit(1);
}

const files = fs.readdirSync(folder);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();

  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    const input = path.join(folder, file);
    const output = path.join(
      folder,
      path.parse(file).name + ".webp"
    );

    try {
      await sharp(input)
        .webp({ quality: 80 })
        .toFile(output);

      console.log(`✔ Converted ${file}`);
    } catch (err) {
      console.error(`❌ Error converting ${file}:`, err);
    }
  }
}