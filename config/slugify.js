// Heading-slug logic shared by markdown-it-anchor (which assigns the heading
// id) and any consumer that needs to reference those ids. Produces clean,
// lowercase, hyphenated ids (e.g. "My Heading!" -> "my-heading").
export default function slugify(text) {
    const slug = String(text)
        .toLowerCase()
        .replace(/<[^>]+>/g, "")        // strip any inline HTML in the heading
        .replace(/[^a-z0-9]+/g, "-")    // non-alphanumeric -> hyphen
        .replace(/^-+|-+$/g, "");       // trim leading/trailing hyphens
    // Headings that are purely symbols/emoji slugify to "" — give them a
    // stable, non-empty id (markdown-it-anchor de-dupes repeats: section-1, …).
    return slug || "section";
}
