import sharp from "sharp";

sharp("image.png")
  .resize(800)
  .webp({ quality: 80 })
  .toFile("image.webp")
  .then(() => console.log("Done! image.webp created."))
  .catch((err) => console.error(err));