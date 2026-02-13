import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sites = [
  {
    name: "Code and Culture",
    description: "Long-form essays on tech and society",
    url: "https://codeandculture.uk",
  },
  {
    name: "Journeys Through Glass",
    description: "Technology experiments and explorations",
    url: "https://journeysthroughglass.net",
  },
];

const faviconDir = path.join(__dirname, "..", "static", "images", "favicons");

function getDomain(url) {
  return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
}

async function fetchFavicon(domain) {
  const filePath = path.join(faviconDir, `${domain}.png`);

  // Skip download if already cached
  if (fs.existsSync(filePath)) {
    return `/images/favicons/${domain}.png`;
  }

  const apiUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      console.warn(`[favicons] Failed to fetch favicon for ${domain}: ${res.status}`);
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    console.log(`[favicons] Downloaded favicon for ${domain}`);
    return `/images/favicons/${domain}.png`;
  } catch (err) {
    console.warn(`[favicons] Error fetching favicon for ${domain}:`, err.message);
    return null;
  }
}

export default async function () {
  fs.mkdirSync(faviconDir, { recursive: true });

  const results = await Promise.all(
    sites.map(async (site) => {
      const domain = getDomain(site.url);
      const favicon = await fetchFavicon(domain);
      return { ...site, domain, favicon };
    })
  );

  return results;
}
