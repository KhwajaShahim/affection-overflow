module.exports = (req, res) => {
  const note = (req.query.note || "Roses are red, neon is bright...").toString();
  const secret = "flag{poison_pen_v3}";

  // Intentional unsafe render behavior (beginner-friendly “template token”):
  const rendered = note.split("{{secret}}").join(secret);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(`
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>💌 Love Note Renderer</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    :root{--bg:#060813;--card:#0f1730;--pink:#ff3ea5;--cyan:#31e7ff;--text:#e7ecff;--muted:#93a0c2;}
    body{margin:0;min-height:120vh;font-family:system-ui,Arial;color:var(--text);
      background:radial-gradient(1100px 650px at 15% 10%, rgba(255,62,165,.18), transparent 55%),
                 radial-gradient(900px 600px at 85% 35%, rgba(49,231,255,.16), transparent 55%),
                 linear-gradient(180deg, var(--bg), #02030a);}
    .wrap{width:min(920px,92vw); margin:40px auto; padding:0 8px;}
    .brand{letter-spacing:.12em;text-transform:uppercase;font-size:12px;color:var(--muted);}
    .card{margin-top:10px;background:rgba(15,23,48,.92);border:1px solid rgba(49,231,255,.22);
      border-radius:18px;padding:18px;box-shadow:0 20px 60px rgba(0,0,0,.55);}
    h1{margin:0 0 6px;font-size:28px;}
    p{margin:10px 0;color:var(--muted);line-height:1.5;}
    input{width:100%;padding:12px 12px;border-radius:14px;border:1px solid rgba(49,231,255,.22);
      background:rgba(3,6,18,.6);color:var(--text);outline:none;}
    .preview{margin-top:14px;padding:14px;border-radius:14px;border:1px solid rgba(255,62,165,.25);background:rgba(255,62,165,.06)}
    code{font-family:ui-monospace,Menlo,Consolas,monospace;color:#fff}
    .hint{margin-top:12px;padding:10px 12px;border-radius:14px;border:1px dashed rgba(49,231,255,.25);background:rgba(49,231,255,.06);color:var(--muted)}
    .filler{height:380px; margin-top:18px; border-radius:14px; border:1px solid rgba(49,231,255,.12);
      background:linear-gradient(180deg, rgba(49,231,255,.05), rgba(255,62,165,.04));
      display:flex; align-items:center; justify-content:center; color:rgba(231,236,255,.55); text-align:center; padding:12px;}
    /* Jumpscare overlay (harmless) */
    .glitch{
      position:fixed; inset:0; display:none; align-items:center; justify-content:center;
      background:rgba(0,0,0,.92);
      z-index:9999;
      font-family: ui-monospace, Menlo, Consolas, monospace;
      color: var(--cyan);
      text-shadow: 0 0 18px rgba(49,231,255,.55);
    }
    .glitch .box{
      border:1px solid rgba(255,62,165,.35);
      border-radius:14px;
      padding:18px 16px;
      background:rgba(255,62,165,.08);
      max-width:min(720px,92vw);
      animation: shake 0.08s linear infinite提醒;
      transform-origin: center;
      will-change: transform;
    }
    @keyframes shake{
      @keyframes shake {
      0%   { transform: translate(0, 0); }
      10%  { transform: translate(-3px, -2px); }
      20%  { transform: translate(3px, 2px); }
      30%  { transform: translate(-3px, 2px); }
      40%  { transform: translate(3px, -2px); }
      50%  { transform: translate(-2px, 2px); }
      60%  { transform: translate(2px, -2px); }
      70%  { transform: translate(-2px, -1px); }
      80%  { transform: translate(2px, 1px); }
      90%  { transform: translate(-1px, 2px); }
      100% { transform: translate(0, 0); }
}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="brand">Affection Overflow • Web • Hard</div>
    <div class="card">
      <h1>💌 Love Note Renderer</h1>
      <p>Write a note. We’ll “render” it into a romantic preview. Nothing could go wrong… right?</p>

      <form method="GET" action="/hard">
        <input name="note" value="${escapeHtml(note)}" />
      </form>

      <div class="preview">
        <b>Preview:</b>
        <div>${escapeHtml(rendered)}</div>
      </div>

      <div class="hint">
        Hint: Try a template-looking token like <code>{{7*7}}</code>… or maybe the secret is something else.
      </div>

      <div class="filler">
        Keep scrolling… the city never sleeps.<br/>
        (Totally normal. Definitely not cursed.)
      </div>
    </div>
  </div>

  <div id="glitch" class="glitch">
    <div class="box">
      <div style="font-size:18px;margin-bottom:8px;color:#fff;">⚠ SIGNAL CORRUPTION DETECTED</div>
      <div>THE POISON PEN IS WATCHING YOU.</div>
      <div style="opacity:.75;margin-top:10px;">…okay jk. Keep hacking 💖</div>
    </div>
  </div>

  <script>
    // Harmless jumpscare: show once when user scrolls near bottom.
    let fired = false;
    function nearBottom() {
      return (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 40);
    }
    window.addEventListener("scroll", () => {
      if (fired) return;
      if (nearBottom()) {
        fired = true;
        const g = document.getElementById("glitch");
        g.style.display = "flex";
        setTimeout(() => { g.style.display = "none"; }, 2800);
      }
    });
  </script>
</body>
</html>
  `);

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }
};
