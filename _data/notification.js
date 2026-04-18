import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import markdownIt from "markdown-it";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const md = markdownIt({ html: false, linkify: true, typographer: true });

export default function () {
    const filePath = path.join(__dirname, "notification.md");
    const raw = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8").trim() : "";
    if (!raw) return { raw: "", html: "" };
    return { raw, html: md.renderInline(raw) };
}
