import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import sharp from "sharp";

const publicDir = resolve(import.meta.dirname ?? __dirname, "../public");
const brandDir = resolve(publicDir, "brand");
const faviconDir = resolve(publicDir, "favicon");
const svgPath = resolve(brandDir, "logo.svg");

// Solid disc background used for "app icon" style assets (apple-touch, PWA).
const DISC = "#050505";

async function appIcon(svg: string, size: number): Promise<Buffer> {
  const markSize = Math.round(size * 0.62);
  const mark = await sharp(Buffer.from(svg))
    .resize(markSize, markSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  const disc = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${DISC}"/></svg>`,
  );
  return sharp(disc).composite([{ input: mark, gravity: "center" }]).png().toBuffer();
}

async function main() {
  // Source mark SVG. Rendered directly (svgo's parser rejects the mark's
  // large number of whitespace char-entities; librsvg/sharp render it fine).
  const rawSvg = readFileSync(svgPath, "utf8");

  // Nav logo PNG (transparent) — fallback for the SVG mark.
  await sharp(Buffer.from(rawSvg))
    .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(brandDir, "logo.png"));
  console.log("✓ logo.png");

  // Brand icon PNGs (transparent).
  const brandSizes = [16, 32, 180, 192, 512];
  for (const size of brandSizes) {
    await sharp(Buffer.from(rawSvg))
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(resolve(brandDir, `icon-${size}.png`));
    console.log(`✓ brand/icon-${size}.png`);
  }

  // Favicons (referenced by app/layout.tsx + site.webmanifest).
  // Small browser-tab icons: bare mark on transparent.
  for (const size of [16, 32]) {
    await sharp(Buffer.from(rawSvg))
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(resolve(faviconDir, `favicon-${size}x${size}.png`));
    console.log(`✓ favicon/favicon-${size}x${size}.png`);
  }
  // App-icon style (mark on solid disc), matching tasmil-strategy's apple-icon.
  await sharp(await appIcon(rawSvg, 180)).toFile(
    resolve(faviconDir, "apple-touch-icon.png"),
  );
  console.log("✓ favicon/apple-touch-icon.png");
  for (const size of [192, 512]) {
    await sharp(await appIcon(rawSvg, size)).toFile(
      resolve(faviconDir, `android-chrome-${size}x${size}.png`),
    );
    console.log(`✓ favicon/android-chrome-${size}x${size}.png`);
  }
  // Note: favicon.ico is a static brand asset copied from tasmil-strategy
  // (sharp cannot author multi-resolution .ico), so it is not regenerated here.

  // Generate OG image.
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="100%" height="100%" fill="#0a0a0a"/>
  <text x="50%" y="45%" text-anchor="middle" font-family="sans-serif" font-size="64" font-weight="bold" fill="white">Tasmil Finance</text>
  <text x="50%" y="58%" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#a3a3a3">AI-Managed DeFi Yield Vaults on Stellar</text>
</svg>`;

  await sharp(Buffer.from(ogSvg)).png().toFile(resolve(brandDir, "og-default.png"));
  console.log("✓ og-default.png");
}

main();
