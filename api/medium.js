module.exports = (req, res) => {
  const id = (req.query.id || "1").toString();

  // Intentional IDOR: no ownership check.
  const messages = {
    "1": { to: "Neo", msg: "Your hoodie is cute. Don’t get caught in the rain tonight." },
    "2": { to: "Rin", msg: "Meet me under the neon sign. Bring one red rose." },
    "3": { to: "Kai", msg: "I traced your heartbeat across the network. It’s steady." },
    "14": { to: "YOU", msg: "Ok fine… you found me. Here: flag{idor_u_later}" }
  };

  const entry = messages[id];

  res.statusCode = entry ? 200 : 404;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end(`
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>💘 Matchmaker Mix-Up</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    :root{--bg:#070a14;--card:#0f1730;--pink:#ff3ea5;--cyan:#31e7ff;--text:#e7ecff;--muted:#93a0c2;}
    body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,Arial;
      background:radial-gradient(1200px 700px at 20% 10%, rgba(255,62,165,.18), transparent 55%),
                 radial-gradient(900px 600px at 85% 40%, rgba(49,231,255,.16), transparent 55%),
                 linear-gradient(180deg, var(--bg), #03040b);
      color:var(--text);}
    .wrap{width:min(860px,92vw); padding:24px;}
    .brand{letter-spacing:.12em;text-transform:uppercase;font-size:12px;color:var(--muted);}
    .card{margin-top:10px;background:rgba(15,23,48,.92);border:1px solid rgba(49,231,255,.22);border-radius:18px;padding:18px;box-shadow:0 20px 60px rgba(0,0,0,.55);}
    h1{margin:0 0 6px;font-size:28px;}
    p{margin:10px 0;color:var(--muted);line-height:1.5;}
    .row{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
    a{color:var(--cyan);text-decoration:none}
    .pill{padding:8px 12px;border-radius:999px;border:1px solid rgba(255,62,165,.22);background:rgba(255,62,165,.07)}
    .msg{margin-top:14px;padding:14px;border-radius:14px;border:1px solid rgba(49,231,255,.22);background:rgba(49,231,255,.05)}
    code{font-family:ui-monospace,Menlo,Consolas,monospace}
    .hint{margin-top:12px;padding:10px 12px;border-radius:14px;border:1px dashed rgba(49,231,255,.25);background:rgba(49,231,255,.06);color:var(--muted)}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="brand">Affection Overflow • Web • Medium</div>
    <div class="card">
      <h1>💘 Matchmaker Mix-Up</h1>
      <p>Secret admirer messages are stored by ID. You’re only supposed to see your own… probably.</p>

      <div class="row">
        <span class="pill">Current: <code>?id=${escapeHtml(id)}</code></span>
        <a class="pill" href="/medium?id=1">id=1</a>
        <a class="pill" href="/medium?id=2">id=2</a>
        <a class="pill" href="/medium?id=3">id=3</a>
      </div>

      ${entry ? `
        <div class="msg">
          <b>To:</b> ${escapeHtml(entry.to)}<br/>
          <b>Message:</b> ${escapeHtml(entry.msg)}
        </div>
      ` : `
        <div class="msg">
          No message found for <code>id=${escapeHtml(id)}</code>.
        </div>
      `}

      <div class="hint">
        Hint: What happens if you change the number in the URL?
      </div>
    </div>
  </div>
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
