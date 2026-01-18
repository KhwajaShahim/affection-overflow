export default async function handler(req, res) {
  // Simple page with a "rendering" bug (very guided, beginner-friendly).
  // Intentional vulnerability style: unsafe "template-like" replacement.
  // Players discover a special token reveals the flag.

  const url = new URL(req.url, `http://${req.headers.host}`);
  const note = url.searchParams.get("note") || "Roses are red, violets are blue...";

  // "Secret" server-side value (in real CTF you’d use env vars)
  const secret = "FLAG{valentines_love_note_renderer}";

  // Intentionally unsafe behavior:
  // If user includes {{secret}}, we substitute server secret.
  // (This mimics the idea of template injection without being too hard.)
  const rendered = note.replaceAll("{{secret}}", secret);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Love Note Renderer</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 760px; margin: 40px auto; }
          .card { padding: 18px; border: 1px solid #ddd; border-radius: 14px; }
          input { width: 100%; padding: 10px; border-radius: 10px; border: 1px solid #ccc; }
          .preview { margin-top: 14px; padding: 12px; border-radius: 12px; background: #f7f7f7; }
          .hint { opacity: .7; margin-top: 12px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>💌 Love Note Renderer</h2>
          <p>Type a note, and we’ll “render” it into a cute card.</p>

          <form method="GET" action="/hard">
            <input name="note" value="${escapeHtml(note)}" />
          </form>

          <div class="preview">
            <b>Preview:</b>
            <div>${escapeHtml(rendered)}</div>
          </div>

          <div class="hint">
            Hints: try something that looks like a template token.<br/>
            Example: <code>{{7*7}}</code> (and… maybe there’s a <code>{{secret}}</code>?)
          </div>
        </div>
      </body>
    </html>
  `);

  function escapeHtml(s) {
    return s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
}
